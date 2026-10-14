"use client";

import { useEffect, useRef, useState } from "react";
import { LOGO_DOTS, LOGO_VIEW } from "./logo-dots";

export type LogoMotion = "form" | "orbit" | "pulse" | "bloom" | "rest";

const MOTION_LABEL: Record<LogoMotion, string> = {
  form: "Logo forming",
  orbit: "Logo orbiting",
  pulse: "Logo pulsing",
  bloom: "Logo blooming",
  rest: "Trulioo logo",
};

export function LogoMark({
  size = 64,
  motion = "form",
  speed = 1,
  paused = false,
  dark = false,
  color = "#004C45",
  dots = 1,
  dotSize = 1,
}: {
  size?: number;
  motion?: LogoMotion;
  speed?: number;
  paused?: boolean;
  dark?: boolean;
  color?: string;
  dots?: number;
  dotSize?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(1.8);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);

    const fill = color || (dark ? "#F4F6F4" : "#172D2D");
    const density = Math.min(1, dots);
    const rings = [0, 1].map((ring) => LOGO_DOTS.filter((dot) => dot.ring === ring));
    const visible = rings.map((ring) => {
      const count = Math.max(3, Math.round(ring.length * density));
      const step = ring.length / count;
      return Array.from({ length: count }, (_, index) => ring[Math.floor(index * step)]);
    });
    const fit = (size * 0.78) / LOGO_VIEW.w;
    const ox = (size - LOGO_VIEW.w * fit) / 2;
    const oy = (size - LOGO_VIEW.h * fit) / 2;
    const radiusScale = dotSize * (dots > 1 ? Math.min(1.8, dots) : 1);
    const X = (x: number) => ox + x * fit;
    const Y = (y: number) => oy + y * fit;
    const R = (r: number) => Math.max(0.35, r * fit * radiusScale);

    const blob = (x: number, y: number, r: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const paint = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = fill;
      const formed = reduced || motion === "rest";

      if (!formed && motion === "orbit") {
        const shift = (time * 0.18) % 1;
        rings.forEach((path, ring) => {
          const count = visible[ring].length;
          for (let index = 0; index < count; index++) {
            const pos = (index / count + shift) * path.length;
            const i0 = Math.floor(pos) % path.length;
            const i1 = (i0 + 1) % path.length;
            const f = pos - Math.floor(pos);
            const a = path[i0];
            const b = path[i1];
            blob(X(a.x + (b.x - a.x) * f), Y(a.y + (b.y - a.y) * f), R(a.r + (b.r - a.r) * f), 1);
          }
        });
        ctx.globalAlpha = 1;
        return;
      }

      if (!formed && motion === "pulse") {
        for (const dot of visible.flat()) {
          const ang = Math.atan2(dot.y - LOGO_VIEW.cy, dot.x - LOGO_VIEW.cx);
          const wave = 0.5 + 0.5 * Math.sin(ang * 1.15 - time * 2.4);
          blob(X(dot.x), Y(dot.y), R(dot.r * (0.55 + 0.9 * wave)), 0.35 + 0.65 * wave);
        }
        ctx.globalAlpha = 1;
        return;
      }

      if (!formed && motion === "bloom") {
        const scale = 0.84 + 0.16 * (0.5 + 0.5 * Math.sin(time * 1.5));
        for (const dot of visible.flat()) {
          const x = LOGO_VIEW.cx + (dot.x - LOGO_VIEW.cx) * scale;
          const y = LOGO_VIEW.cy + (dot.y - LOGO_VIEW.cy) * scale;
          blob(X(x), Y(y), R(dot.r * (0.9 + 0.18 * scale)), 0.8 + 0.2 * scale);
        }
        ctx.globalAlpha = 1;
        return;
      }

      const cycle = 4.2;
      const progress = formed ? 0.58 : (time % cycle) / cycle;
      for (const dot of visible.flat()) {
        const stagger = ((Math.atan2(dot.y - LOGO_VIEW.cy, dot.x - LOGO_VIEW.cx) + Math.PI) / (Math.PI * 2)) * 0.16;
        let gather = 1;
        if (!formed) {
          if (progress < 0.28) gather = smooth((progress - stagger * 0.4) / 0.22);
          else if (progress < 0.75) gather = 1;
          else gather = 1 - smooth((progress - 0.75) / 0.2);
        }
        const ang = Math.atan2(dot.y - LOGO_VIEW.cy, dot.x - LOGO_VIEW.cx);
        const dist = Math.hypot(dot.x - LOGO_VIEW.cx, dot.y - LOGO_VIEW.cy);
        const sx = LOGO_VIEW.cx + Math.cos(ang + 0.55) * dist * 1.28;
        const sy = LOGO_VIEW.cy + Math.sin(ang + 0.55) * dist * 1.28;
        blob(
          X(sx + (dot.x - sx) * gather),
          Y(sy + (dot.y - sy) * gather),
          R(dot.r * (0.4 + 0.6 * gather)),
          0.2 + 0.8 * gather,
        );
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let last = performance.now();
    const still = paused || reduced || motion === "rest";
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!still) elapsed.current += dt * speed;
      paint(elapsed.current);
      if (!still) raf = requestAnimationFrame(frame);
    };
    paint(elapsed.current);
    if (!still) raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [size, motion, speed, paused, dark, color, dots, dotSize, reduced]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={MOTION_LABEL[motion]}
      style={{ width: size, height: size, display: "block" }}
    />
  );
}

function smooth(value: number) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}
