/**
 * Device IntelLoading — dotted spinning globe + live controls.
 * Land mask is the same map COBE ships (MIT, shuding/cobe).
 * Dots are drawn individually so size, color, and shimmer
 * do not scale or recolor the sphere.
 */
const CONFIG_URL = new URL("./device-intel-loading.json?v=pos", import.meta.url);

const LAND_MASK =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg==";

function applyBackground(config) {
  const root = document.querySelector(".dil");
  const radial = document.getElementById("dil-radial");
  const wash = document.getElementById("dil-wash");
  if (!root || !config.background) return;

  const bg = config.background;
  const from = bg.gradientOverlay?.from || "#FFFFFF";
  const to = bg.gradientOverlay?.to || "#CFFFE2";
  const gradient = `linear-gradient(180deg, ${from} 0%, ${to} 100%)`;
  root.style.background = gradient;

  if (wash) wash.style.background = gradient;
  if (radial) radial.style.opacity = "0";

}

function isLand(data, width, height, x, y, z) {
  const lat = Math.asin(Math.max(-1, Math.min(1, y)));
  const lon = Math.atan2(z, x);
  let u = lon / (Math.PI * 2);
  let v = -(lat / Math.PI + 0.5);
  u -= Math.floor(u);
  v -= Math.floor(v);
  const px = Math.min(width - 1, Math.floor(u * width));
  const py = Math.min(height - 1, Math.floor(v * height));
  return data[(py * width + px) * 4] > 48;
}

function buildSphereDots(imageData, globeRadius, dotSize, density) {
  const { width, height, data } = imageData;
  const tight = Math.min(1, Math.max(0.2, density));
  const angular = (2 * dotSize * 1.08) / (globeRadius * tight);
  const samples = Math.round(Math.min(20000, Math.max(600, (4 * Math.PI) / (angular * angular))));
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * ring;
    const z = Math.sin(theta) * ring;
    if (!isLand(data, width, height, x, y, z)) continue;
    pts.push({
      x,
      y,
      z,
      phase: (i % 360) * (Math.PI / 180),
      rate: 1.4 + (i % 7) * 0.35,
    });
  }
  return pts;
}

function project(p, phi, theta) {
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  const x1 = p.x * cp + p.z * sp;
  const z1 = -p.x * sp + p.z * cp;
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const y2 = p.y * ct - z1 * st;
  const z2 = p.y * st + z1 * ct;
  return { x: x1, y: y2, z: z2 };
}

function mountGlobe(canvas, config, params) {
  const ctx = canvas.getContext("2d");
  const globeCfg = config.globe || {};
  const anim = config.animation || {};
  let phi = globeCfg.phi ?? 0.4;
  const theta = globeCfg.theta ?? 0.22;
  if (params.spinSpeed == null) params.spinSpeed = anim.phiDelta ?? 0.0005;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let layoutSize = 1;
  let points = [];
  let imageData = null;
  let gridKey = "";
  let running = true;

  function resize() {
    const parent = canvas.parentElement.getBoundingClientRect();
    layoutSize = Math.max(1, Math.floor(parent.width || 402));
  }

  function frame(now) {
    if (!running) return;
    const time = now / 1000;
    phi += params.spinSpeed;

    const radius = layoutSize * 0.46 * params.scale;
    const cx = layoutSize / 2 + params.offsetX;
    const cy = layoutSize / 2 + params.offsetY;
    const pad = params.dotSize + 4;
    const left = Math.floor(cx - radius - pad);
    const top = Math.floor(cy - radius - pad);
    const size = Math.ceil((radius + pad) * 2);

    if (canvas.width !== Math.floor(size * dpr) || canvas.height !== Math.floor(size * dpr)) {
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
    }
    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.style.margin = "0";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    if (imageData) {
      const key = `${layoutSize}|${params.dotSize}|${params.density}|${params.scale}`;
      if (key !== gridKey) {
        gridKey = key;
        points = buildSphereDots(imageData, radius, params.dotSize, params.density);
      }
    }

    if (points.length) {
      const drawX = cx - left;
      const drawY = cy - top;
      const shine = params.shine;
      const dotRadius = params.dotSize;

      ctx.fillStyle = params.dotColor;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const q = project(p, phi, theta);
        if (q.z <= 0) continue;

        const spark =
          0.5 +
          0.35 * Math.sin(time * p.rate + p.phase) +
          0.15 * Math.sin(time * p.rate * 2.3 + p.phase * 1.7);
        const flicker = 1 - shine * (1 - spark);
        const depth = q.z;
        ctx.globalAlpha = params.opacity * Math.max(0.08, flicker) * (0.5 + 0.5 * depth);

        const px = drawX + q.x * radius;
        const py = drawY - q.y * radius;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.4, dotRadius * (0.22 + 0.78 * depth)), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);

  const mask = new Image();
  mask.onload = () => {
    const scratch = document.createElement("canvas");
    scratch.width = mask.width;
    scratch.height = mask.height;
    const g = scratch.getContext("2d", { willReadFrequently: true });
    g.drawImage(mask, 0, 0);
    imageData = g.getImageData(0, 0, mask.width, mask.height);
    gridKey = "";
  };
  mask.src = LAND_MASK;

  requestAnimationFrame(frame);

  return () => {
    running = false;
    window.removeEventListener("resize", resize);
  };
}

function bindWidget(params, root) {
  const widget = document.getElementById("dil-widget");
  const toggle = document.getElementById("dil-widget-toggle");
  const close = document.getElementById("dil-widget-close");
  const panel = document.getElementById("dil-widget-panel");
  const wash = document.getElementById("dil-wash");

  const ctrlBg = document.getElementById("ctrl-bg");
  const ctrlOpacity = document.getElementById("ctrl-opacity");
  const ctrlDotSize = document.getElementById("ctrl-dot-size");
  const ctrlDotColor = document.getElementById("ctrl-dot-color");
  const ctrlDensity = document.getElementById("ctrl-density");
  const ctrlShine = document.getElementById("ctrl-shine");
  const ctrlX = document.getElementById("ctrl-x");
  const ctrlY = document.getElementById("ctrl-y");
  const ctrlScale = document.getElementById("ctrl-scale");
  const ctrlSpin = document.getElementById("ctrl-spin");

  const outOpacity = document.getElementById("out-opacity");
  const outDotSize = document.getElementById("out-dot-size");
  const outDensity = document.getElementById("out-density");
  const outShine = document.getElementById("out-shine");
  const outX = document.getElementById("out-x");
  const outY = document.getElementById("out-y");
  const outScale = document.getElementById("out-scale");
  const outSpin = document.getElementById("out-spin");

  function setCollapsed(collapsed) {
    widget.classList.toggle("is-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    panel.hidden = collapsed;
  }

  function paintBackground(color) {
    const gradient = `linear-gradient(180deg, #ffffff 0%, ${color} 100%)`;
    root.style.background = gradient;
    if (wash) wash.style.background = gradient;
  }

  toggle.addEventListener("click", () => setCollapsed(false));
  close.addEventListener("click", () => setCollapsed(true));

  ctrlBg.value = params.backgroundColor;
  ctrlOpacity.value = String(params.opacity);
  ctrlDotSize.value = String(params.dotSize);
  ctrlDotColor.value = params.dotColor;
  ctrlDensity.value = String(params.density);
  ctrlShine.value = String(params.shine);
  ctrlX.value = String(params.offsetX);
  ctrlY.value = String(params.offsetY);
  ctrlScale.value = String(params.scale);
  ctrlSpin.value = String(params.spinSpeed);

  outOpacity.value = Number(params.opacity).toFixed(2);
  outDotSize.value = `${Number(params.dotSize).toFixed(1)}px`;
  outDensity.value = `${Math.round(params.density * 100)}%`;
  outShine.value = Number(params.shine).toFixed(2);
  outX.value = String(params.offsetX);
  outY.value = String(params.offsetY);
  outScale.value = Number(params.scale).toFixed(2);
  outSpin.value = Number(params.spinSpeed).toFixed(4);

  ctrlBg.addEventListener("input", () => {
    params.backgroundColor = ctrlBg.value;
    paintBackground(params.backgroundColor);
  });

  ctrlOpacity.addEventListener("input", () => {
    params.opacity = Number(ctrlOpacity.value);
    outOpacity.value = params.opacity.toFixed(2);
  });

  ctrlDotSize.addEventListener("input", () => {
    params.dotSize = Number(ctrlDotSize.value);
    outDotSize.value = `${params.dotSize.toFixed(1)}px`;
  });

  ctrlDotColor.addEventListener("input", () => {
    params.dotColor = ctrlDotColor.value;
  });

  ctrlDensity.addEventListener("input", () => {
    params.density = Number(ctrlDensity.value);
    outDensity.value = `${Math.round(params.density * 100)}%`;
  });

  ctrlShine.addEventListener("input", () => {
    params.shine = Number(ctrlShine.value);
    outShine.value = params.shine.toFixed(2);
  });

  ctrlX.addEventListener("input", () => {
    params.offsetX = Number(ctrlX.value);
    outX.value = String(params.offsetX);
  });

  ctrlY.addEventListener("input", () => {
    params.offsetY = Number(ctrlY.value);
    outY.value = String(params.offsetY);
  });

  ctrlScale.addEventListener("input", () => {
    params.scale = Number(ctrlScale.value);
    outScale.value = params.scale.toFixed(2);
  });

  ctrlSpin.addEventListener("input", () => {
    params.spinSpeed = Number(ctrlSpin.value);
    outSpin.value = params.spinSpeed.toFixed(4);
  });

  setCollapsed(true);
}

async function init() {
  const res = await fetch(CONFIG_URL);
  if (!res.ok) throw new Error(`Failed to load ${CONFIG_URL}`);
  const config = await res.json();
  const globeCfg = config.globe || {};

  const params = {
    backgroundColor: config.background?.gradientOverlay?.to || "#CFFFE2",
    opacity: globeCfg.opacity ?? 0.85,
    dotSize: globeCfg.dotSize ?? 4.2,
    dotColor: globeCfg.dotColor || "#94E1C4",
    density: 0.7,
    shine: 0.8,
    offsetX: config.layout?.offsetX ?? -80,
    offsetY: config.layout?.offsetY ?? 10,
    scale: config.layout?.scale ?? 1.4,
    spinSpeed: config.animation?.phiDelta ?? 0.0005,
  };

  applyBackground(config);

  const root = document.querySelector(".dil");
  const canvas = document.getElementById("dil-canvas");
  if (!canvas || !root) return;

  bindWidget(params, root);
  mountGlobe(canvas, config, params);
}

init().catch((err) => {
  console.error("[device-intel-loading]", err);
});
