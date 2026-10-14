/**
 * Canvas is larger than the laid-out `size` so breathing / volume scale
 * stays inside the bitmap. REST_RADIUS below must stay 1 / ORB_BLEED.
 */
export const ORB_BLEED = 1.08;

/**
 * ChatGPT-style voice orb.
 *
 * Design uniforms (defaults live in `DEFAULT_ORB_DESIGN`):
 *   uCloudScale    — spatial frequency. Lower = bigger, softer masses.
 *   uWarpStrength  — how far domain warping shoves the clouds.
 *   uBandAngle     — diagonal light band, in radians. ~0.785 is bottom-left → upper-right.
 *   uBandWidth     — half-width of that band in uv radii. Higher = broader wash.
 *   uEdgeSoftness  — alpha falloff inside the rim, in uv radii.
 *   uVerticalBias  — how hard the deep color pools at the bottom (0 = flat, 1 = strong).
 *   uGlow          — fresnel-like inner rim light.
 *   uVignette      — how much the inner edge darkens for spherical depth.
 */
export const orbFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColorDeep;
uniform vec3 uColorMid;
uniform vec3 uColorLight;
uniform float uAmplitude;
uniform float uSpeed;
uniform float uState;
uniform float uWarp;
uniform float uBrightness;
uniform float uSaturation;
uniform float uScale;
uniform float uCloudScale;
uniform float uWarpStrength;
uniform float uBandAngle;
uniform float uBandWidth;
uniform float uEdgeSoftness;
uniform float uVerticalBias;
uniform float uGlow;
uniform float uVignette;

const float REST_RADIUS = ${ (1 / ORB_BLEED).toFixed(6) };

// --- Simplex noise (Ashima Arts / Stefan Gustavson, public domain) ---

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// 4-octave fBm. Each octave is rotated so the pattern never locks to a grid.
float fbm(vec2 p) {
  const mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p);
    p = rot * p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

// 3-stop gradient. t = 0 is deep azure, t = 1 is near-white.
vec3 grade(float t) {
  vec3 col = mix(uColorDeep, uColorMid, smoothstep(0.0, 0.42, t));
  col = mix(col, uColorLight, smoothstep(0.22, 0.72, t));
  return col;
}

void main() {
  // 1. Centered uv. +y is up. x is corrected so a non-square canvas stays round.
  vec2 uv = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  uv.x *= uResolution.x / max(uResolution.y, 1.0);
  uv /= max(uScale, 0.25);

  float dist = length(uv);
  if (dist > REST_RADIUS + uEdgeSoftness) discard;

  // Orb-local coordinates, roughly -1..1 across the resting circle.
  vec2 local = uv / REST_RADIUS;

  // Seconds, already scaled by the eased state speed.
  float t = uTime * max(uSpeed, 0.0);

  // uState is the mode index (0 idle … 4 muted). Color and motion ease through
  // the other uniforms; this nudge only keeps the uniform live for tweaking.
  vec2 p = local * uCloudScale;
  p += vec2(uState, -uState) * 0.00015;

  // Slow orbital drift so the field flows instead of boiling in place.
  // Rates are tuned so uSpeed ≈ 0.15 is a calm drift and ≈ 0.6 swirls.
  float spin = t * 1.35;
  float cs = cos(spin);
  float sn = sin(spin);
  p = mat2(cs, sn, -sn, cs) * p;
  p += vec2(t * 0.7, -t * 0.28);

  // 2. Domain warp: fbm(p + fbm(p + t)). Two scalars give the offset a direction.
  float warp = uWarpStrength * uWarp * (0.82 + uAmplitude * 0.38);
  float w1 = fbm(p + vec2(t * 0.85, t * 0.55));
  float w2 = fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.65, t * 0.4));
  float n = fbm(p + vec2(w1, w2) * warp);

  // Soft contrast curve — keeps the masses painterly instead of speckled.
  float n01 = clamp(n * 0.5 + 0.5, 0.0, 1.0);
  n01 = n01 * n01 * (3.0 - 2.0 * n01);

  // Broad, even lower-frequency swell so color regions stay large.
  float broad = fbm(p * 0.62 + vec2(2.4, 8.1)) * 0.5 + 0.5;

  // 3. Vertical bias: blue dominates the bottom, white the top, noise bends the boundary.
  float y01 = local.y * 0.5 + 0.5;
  float shade = clamp(y01 * uVerticalBias + n01 * 0.7 + broad * 0.14 - 0.28, 0.0, 1.0);
  vec3 col = grade(shade);

  // Extra saturated pool along the bottom, broken up by the cloud field.
  float pool = smoothstep(0.28, -0.55, local.y);
  pool *= mix(0.55, 1.0, 1.0 - n01);
  col = mix(col, uColorDeep, pool * 0.8);

  // Pale wisps toward the top. Ridged fbm reads as feathers, not blobs.
  float wisps = 1.0 - abs(fbm(p * 1.35 + vec2(t * 1.1, 1.4)));
  wisps = smoothstep(0.42, 0.86, wisps);
  col = mix(col, uColorLight, wisps * 0.42 * smoothstep(-0.2, 0.45, local.y));

  // Diagonal band, bottom-left → upper-right. Perpendicular distance to y = x,
  // then warped by noise so the edges feather into cloud instead of a stripe.
  float s = sin(uBandAngle);
  float c = cos(uBandAngle);
  float sd = local.x * -s + local.y * c;
  sd += (n01 - 0.5) * 0.7;
  sd += sin(t * 1.1) * 0.08;
  float band = exp(-(sd * sd) / max(uBandWidth * uBandWidth, 0.0001));
  band *= mix(0.35, 1.0, smoothstep(0.2, 0.75, n01));
  band *= smoothstep(-0.75, 0.15, local.y);
  col = mix(col, uColorLight, clamp(band, 0.0, 1.0) * 0.92);

  // Soft spherical wrap so the disc reads as a glossy volume.
  float z = sqrt(max(0.0, 1.0 - dot(local, local)));
  vec3 normal = normalize(vec3(local, z));
  vec3 lightDir = normalize(vec3(-0.32 + sin(t * 0.8) * 0.06, 0.52, 0.78));
  float ndl = clamp(dot(normal, lightDir), 0.0, 1.0);
  col *= 0.9 + 0.16 * ndl;
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(clamp(dot(normal, halfDir), 0.0, 1.0), 22.0);
  col += uColorLight * spec * (0.1 + uAmplitude * 0.05);

  // 4. Fresnel-like inner glow, then a vignette that stops before the alpha rim
  //    so the feather doesn't composite as a dark halo on white.
  float rim = smoothstep(0.52, 0.9, dist / REST_RADIUS);
  rim *= 1.0 - smoothstep(0.9, 1.02, dist / REST_RADIUS);
  col += mix(uColorMid, uColorLight, 0.7) * rim * uGlow;

  float vig = smoothstep(0.4, 0.84, dist / REST_RADIUS);
  col *= 1.0 - uVignette * vig * (1.0 - smoothstep(0.84, 0.98, dist / REST_RADIUS));

  col *= uBrightness;
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, uSaturation);
  col = clamp(col, 0.0, 1.0);

  // 5. Smooth alpha at the rim, premultiplied so the edge composites cleanly.
  float alpha = 1.0 - smoothstep(REST_RADIUS - uEdgeSoftness, REST_RADIUS, dist);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;
