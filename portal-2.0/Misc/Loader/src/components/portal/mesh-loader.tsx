"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type BlobMotion = {
  size: number;
  x: number;
  y: number;
  path: { x: number[]; y: number[] };
  duration: number;
};

/** Motion paths sampled to match the Figma mesh. Colors are separate so they can be themed. */
const BLOB_MOTION: BlobMotion[] = [
  { size: 0.62, x: -0.05, y: -0.1, path: { x: [0, 0.18, 0.05, 0], y: [0, 0.1, 0.2, 0] }, duration: 7 },
  { size: 0.6, x: 0.2, y: 0.05, path: { x: [0, -0.15, 0.1, 0], y: [0, 0.18, -0.05, 0] }, duration: 9 },
  { size: 0.62, x: 0.5, y: 0.0, path: { x: [0, -0.2, 0.05, 0], y: [0, 0.15, 0.25, 0] }, duration: 8 },
  { size: 0.55, x: 0.55, y: 0.25, path: { x: [0, -0.25, -0.1, 0], y: [0, 0.2, -0.1, 0] }, duration: 10 },
  { size: 0.65, x: 0.45, y: 0.55, path: { x: [0, -0.15, 0.1, 0], y: [0, -0.2, -0.05, 0] }, duration: 8.5 },
  { size: 0.6, x: -0.05, y: 0.55, path: { x: [0, 0.2, 0.1, 0], y: [0, -0.15, 0.05, 0] }, duration: 9.5 },
];

/** Palette sampled from the Figma mesh gradient control points. */
export const DEFAULT_MESH_COLORS = ["#FFD166", "#9EDFB6", "#59C7CA", "#166534", "#138FB3", "#05D6A1"] as const;

export const DEFAULT_MESH_BASE = "#59A6A6";
export const DEFAULT_MESH_LOGO = "#004C45";

const LOGO_WIDTH = 69.3008 / 132;
const LOGO_HEIGHT = 56.8534 / 132;

export type MeshLoaderProps = {
  /** Diameter in px. Matches the 132px Figma frame by default. */
  size?: number;
  /** Playback rate. 1 is the original timing. */
  speed?: number;
  /** Blur as a fraction of the diameter. */
  blur?: number;
  /** Scales every color blob together. */
  blobScale?: number;
  /** Scales the dots mark relative to the Figma size. */
  logoScale?: number;
  logoColor?: string;
  /** Six mesh colors, in blob order. Missing entries fall back to the Figma palette. */
  colors?: readonly string[];
  /** Color showing through between the blobs. */
  base?: string;
  /** Drop shadow strength. 0 is none, 1 is the strongest. */
  shadow?: number;
  /** Drop shadow color. Strength still controls how heavy it reads. */
  shadowColor?: string;
  paused?: boolean;
  className?: string;
  label?: string;
};

export function MeshLoader({
  size = 132,
  speed = 1,
  blur = 0.14,
  blobScale = 1,
  logoScale = 1,
  logoColor = DEFAULT_MESH_LOGO,
  colors = DEFAULT_MESH_COLORS,
  base = DEFAULT_MESH_BASE,
  shadow = 0,
  shadowColor = "#042E2A",
  paused = false,
  className,
  label = "Loading",
}: MeshLoaderProps) {
  const rate = Math.max(0.15, speed);
  const shade = Math.min(1, Math.max(0, shadow));
  const motionId = useId().replace(/:/g, "");

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("relative shrink-0", className)}
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        boxShadow:
          shade > 0
            ? `0 ${Math.round(size * 0.08)}px ${Math.round(size * 0.42 * shade)}px ${Math.round(size * 0.06 * shade)}px rgba(${hexToRgb(shadowColor)}, ${0.12 + shade * 0.34})`
            : undefined,
      }}
    >
      <style>{meshKeyframes(motionId, size)}</style>
      <div className="absolute inset-0 overflow-hidden rounded-full" style={{ background: base }}>
      <div className="absolute inset-0" style={{ filter: `blur(${size * blur}px)`, transform: "scale(1.2)" }}>
        {BLOB_MOTION.map((blob, index) => (
          <span
            key={`${index}-${rate}`}
            className="absolute rounded-full"
            style={{
              width: size * blob.size * blobScale,
              height: size * blob.size * blobScale,
              left: size * blob.x,
              top: size * blob.y,
              background: colors[index] ?? DEFAULT_MESH_COLORS[index],
              animationName: paused ? "none" : `mesh-${motionId}-${index}`,
              animationDuration: `${blob.duration / rate}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: size * LOGO_WIDTH * logoScale,
          height: size * LOGO_HEIGHT * logoScale,
          background: logoColor,
          WebkitMaskImage: "url(/figma/loader-logo-dots.svg)",
          maskImage: "url(/figma/loader-logo-dots.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      />
      </div>
    </div>
  );
}

function hexToRgb(hex: string) {
  const raw = hex.trim().replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((channel) => channel + channel).join("") : raw.slice(0, 6);
  const value = Number.parseInt(full, 16);
  if (!Number.isFinite(value) || full.length < 6) return "4, 46, 42";
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

function meshKeyframes(id: string, size: number) {
  return BLOB_MOTION.map((blob, index) => {
    const frames = blob.path.x
      .map((x, step) => {
        const pct = (step / (blob.path.x.length - 1)) * 100;
        const y = blob.path.y[step] ?? 0;
        return `${pct}%{transform:translate(${x * size}px,${y * size}px)}`;
      })
      .join("");
    return `@keyframes mesh-${id}-${index}{${frames}}`;
  }).join("");
}
