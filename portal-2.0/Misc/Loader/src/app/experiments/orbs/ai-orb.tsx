"use client";

import { ThinkingOrb, type ModeOpts, type OrbState } from "thinking-orbs";

const AI_INK = "#8F2CF3";

export function AiOrb({
  state = "working",
  size = 64,
  speed = 1,
  dark = false,
  paused = false,
  color = AI_INK,
  dots = 1,
  dotSize = 1,
  opts,
}: {
  state?: OrbState;
  size?: 64 | 32 | 20;
  speed?: number;
  dark?: boolean;
  paused?: boolean;
  /** Ink tint. An empty string uses the stock grayscale. */
  color?: string;
  /** Density multiplier. 1 is the tuned count. */
  dots?: number;
  /** Dot radius multiplier. 1 is the tuned mark. */
  dotSize?: number;
  opts?: ModeOpts;
}) {
  return (
    <ThinkingOrb
      state={state}
      size={size}
      speed={speed}
      paused={paused}
      theme={dark ? "dark" : "light"}
      color={color || undefined}
      dots={dots}
      dotSize={dotSize}
      opts={opts}
    />
  );
}
