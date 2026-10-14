"use client";

import { useMemo } from "react";
import { MODE_FRAMES, ThinkingOrb, type ModeFrame } from "thinking-orbs";
import { LogoMark } from "./logo-mark";

function tunedSize(size: number): 64 | 32 | 20 {
  if (size >= 48) return 64;
  if (size >= 26) return 32;
  return 20;
}

/**
 * Innermost ink edge of the breathing ring, as a fraction of the canvas.
 * Measured from the tuned preset so the disc meets the loader.
 */
const HOLE: Record<64 | 32 | 20, number> = {
  64: 19.336 / 64,
  32: 9.295 / 32,
  20: 5.406 / 20,
};

/**
 * Seat the ring on the circle. The innermost ink at every angle is pulled
 * onto one radius, so the hole stays round and the loader stays flush with
 * the disc while the outer band keeps breathing.
 */
function attachToCircle(hole: number): ModeFrame {
  return (size, t, opts) => {
    const frame = MODE_FRAMES.ring(size, t, opts);
    const cx = size / 2;
    const cy = size / 2;
    const limit = size * hole;
    const bins = 72;
    const placed = frame.dots.map((dot) => {
      const dx = dot.x - cx;
      const dy = dot.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const ang = Math.atan2(dy, dx);
      const bin = Math.min(bins - 1, Math.floor(((ang + Math.PI) / (Math.PI * 2)) * bins));
      return { dot, dx, dy, dist, edge: dist - dot.r, bin };
    });
    const minEdge = Array.from({ length: bins }, () => Infinity);
    for (const item of placed) minEdge[item.bin] = Math.min(minEdge[item.bin], item.edge);
    for (let i = 0; i < bins; i++) {
      if (minEdge[i] < Infinity) continue;
      let nearest = Infinity;
      for (let step = 1; step < bins; step++) {
        const prev = minEdge[(i - step + bins) % bins];
        const next = minEdge[(i + step) % bins];
        if (prev < Infinity) nearest = Math.min(nearest, prev);
        if (next < Infinity) nearest = Math.min(nearest, next);
        if (nearest < Infinity) break;
      }
      minEdge[i] = nearest;
    }
    return {
      lines: frame.lines,
      dots: placed.map((item) => {
        const shift = minEdge[item.bin] - limit;
        const scale = (item.dist - shift) / item.dist;
        return { ...item.dot, x: cx + item.dx * scale, y: cy + item.dy * scale };
      }),
    };
  };
}

export function LogoBreath({
  size = 64,
  speed = 1,
  paused = false,
  dark = false,
  color = "#8F2CF3",
  dots = 1,
  dotSize = 1,
}: {
  size?: number;
  speed?: number;
  paused?: boolean;
  dark?: boolean;
  color?: string;
  dots?: number;
  dotSize?: number;
}) {
  const tuned = tunedSize(size);
  const scale = size / tuned;
  const radius = tuned * HOLE[tuned];
  const disc = radius * 2;
  // Dots overlap the stroke so the loader sits on the circle instead of floating outside it.
  const overlap = 1.5;
  const maskRadius = Math.max(0, radius - overlap);
  const mark = Math.round(disc * 0.72);
  const ink = color || (dark ? "#F4F6F4" : "#172D2D");
  const frame = useMemo(() => attachToCircle(maskRadius / tuned), [tuned, maskRadius]);

  return (
    <div className="grid place-items-center" style={{ width: size, height: size }}>
      <div
        role="img"
        aria-label="Trulioo logo inside a circle, with the breathing loader around it"
        className="relative"
        style={{ width: tuned, height: tuned, transform: `scale(${scale})` }}
      >
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: disc,
            height: disc,
            background: dark ? "#1c2824" : "#ffffff",
            borderColor: ink,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            maskImage: `radial-gradient(circle at center, transparent ${maskRadius}px, #000 ${maskRadius}px)`,
            WebkitMaskImage: `radial-gradient(circle at center, transparent ${maskRadius}px, #000 ${maskRadius}px)`,
          }}
        >
          <ThinkingOrb
            state="breathing"
            size={tuned}
            speed={speed}
            paused={paused}
            theme={dark ? "dark" : "light"}
            color={color || undefined}
            dots={dots}
            dotSize={dotSize}
            frame={frame}
          />
        </div>
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LogoMark size={mark} motion="rest" paused dark={dark} color={color} dots={dots} dotSize={dotSize} />
        </div>
      </div>
    </div>
  );
}
