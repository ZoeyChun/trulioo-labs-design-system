/**
 * Full-quad vertex shader.
 * The quad covers clip space (-1..1). UVs are derived in the fragment shader
 * from gl_FragCoord so the quad stays resolution-independent.
 */
export const orbVertexShader = /* glsl */ `
precision mediump float;

attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;
