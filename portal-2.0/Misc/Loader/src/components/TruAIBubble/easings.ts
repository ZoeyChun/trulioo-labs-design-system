/** Shared motion easings — use only these. */
export const EASE = {
  /** Ambient drift (sine in-out) */
  loop: "cubic-bezier(0.37, 0, 0.63, 1)",
  /** Arriving / resizing */
  outSoft: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** Speed ramps */
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  /** Completed pop out only */
  pop: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export const EASE_CSS = {
  loop: [0.37, 0, 0.63, 1] as const,
  outSoft: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  pop: [0.34, 1.56, 0.64, 1] as const,
};

/** Evaluate a cubic-bezier easing at t in [0,1]. */
export function cubicBezier(
  t: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  const clamped = Math.min(1, Math.max(0, t));
  // Newton-Raphson on x(t) to find parameter, then sample y.
  let u = clamped;
  for (let i = 0; i < 6; i += 1) {
    const x = sampleBezier(u, x1, x2) - clamped;
    const dx = sampleBezierDeriv(u, x1, x2);
    if (Math.abs(dx) < 1e-6) break;
    u -= x / dx;
  }
  return sampleBezier(u, y1, y2);
}

function sampleBezier(t: number, a: number, b: number) {
  // P0=0, P1=a, P2=b, P3=1
  const u = 1 - t;
  return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
}

function sampleBezierDeriv(t: number, a: number, b: number) {
  const u = 1 - t;
  return 3 * u * u * a + 6 * u * t * (b - a) + 3 * t * t * (1 - b);
}

export function easeInOut(t: number) {
  const [x1, y1, x2, y2] = EASE_CSS.inOut;
  return cubicBezier(t, x1, y1, x2, y2);
}

export function easeOutSoft(t: number) {
  const [x1, y1, x2, y2] = EASE_CSS.outSoft;
  return cubicBezier(t, x1, y1, x2, y2);
}

export function easePop(t: number) {
  const [x1, y1, x2, y2] = EASE_CSS.pop;
  return cubicBezier(t, x1, y1, x2, y2);
}
