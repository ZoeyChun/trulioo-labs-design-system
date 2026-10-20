import type { TruAIState } from "./types";
import { easeInOut, easeOutSoft, easePop } from "./easings";

export const ORB_SIZE = 64;
export const ORB_OVERLAP = -4;

/**
 * Figma LogoIcon 1448:75532 mesh gradient — dominant center stop (p11).
 * Source: Portal-2.0 ShaderFill mesh points.
 */
export const ORB_BASE = "#9EDFB6";
/** Blur host (static) — softens blob edges into atmosphere. */
export const ORB_BLUR_PX = 12;

/**
 * Soft color blobs approximating the Figma 4×4 mesh stops.
 * Homes map roughly to mesh point positions (0–100% → orb space).
 */
export type BlobDef = {
  /** Solid core color (radial fades to transparent) */
  color: string;
  /** Diameter as fraction of orb size */
  size: number;
  homeX: number;
  homeY: number;
  /** Max travel as fraction of orb diameter (≤ 0.25) */
  travel: number;
  ax: number;
  ay: number;
  scaleAmp: number;
  period: number;
  opacity: number;
};

export const BLOBS: readonly BlobDef[] = [
  {
    // p00 / p30 — warm yellow
    color: "#FFD166",
    size: 0.95,
    homeX: -0.18,
    homeY: -0.28,
    travel: 0.12,
    ax: 1,
    ay: 0.9,
    scaleAmp: 0.035,
    period: 1,
    opacity: 0.8,
  },
  {
    // p10 / p11 / p21 — mint body
    color: "#9EDFB6",
    size: 1.15,
    homeX: 0.0,
    homeY: -0.06,
    travel: 0.11,
    ax: 0.95,
    ay: 1,
    scaleAmp: 0.03,
    period: 1.37,
    opacity: 0.75,
  },
  {
    // p20 — cyan top-right
    color: "#5AC6CA",
    size: 1.05,
    homeX: 0.22,
    homeY: -0.12,
    travel: 0.13,
    ax: 0.95,
    ay: 1.05,
    scaleAmp: 0.035,
    period: 1.83,
    opacity: 0.85,
  },
  {
    // p31 / p02 — forest green accents (keep modest so blur doesn’t muddy)
    color: "#166534",
    size: 0.75,
    homeX: 0.32,
    homeY: 0.08,
    travel: 0.1,
    ax: 1.05,
    ay: 0.9,
    scaleAmp: 0.03,
    period: 2.17,
    opacity: 0.45,
  },
  {
    // p22 — mid teal
    color: "#33A68C",
    size: 1.0,
    homeX: 0.06,
    homeY: 0.2,
    travel: 0.12,
    ax: 0.9,
    ay: 1.05,
    scaleAmp: 0.035,
    period: 2.41,
    opacity: 0.8,
  },
  {
    // p32 / p33 — deep blue-teal lower-right
    color: "#128AB2",
    size: 0.95,
    homeX: 0.26,
    homeY: 0.28,
    travel: 0.12,
    ax: 0.9,
    ay: 1.1,
    scaleAmp: 0.03,
    period: 2.73,
    opacity: 0.78,
  },
  {
    // p03 — bright aqua bottom-left
    color: "#05D6A1",
    size: 0.9,
    homeX: -0.2,
    homeY: 0.3,
    travel: 0.11,
    ax: 1.05,
    ay: 0.85,
    scaleAmp: 0.03,
    period: 2.97,
    opacity: 0.75,
  },
] as const;

/** Idle: slowest layer ~16s */
export const IDLE_BASE_PERIOD_S = 16;
export const SMOOTH_TAU_S = 0.55;
export const COMPLETED_STOP_MS = 600;
export const COMPLETED_POP_MS = 700;
export const COMPLETED_RESUME_MS = 900;

export type OrbMotionTargets = { speed: number; amplitude: number };

export function targetsForState(state: TruAIState): OrbMotionTargets {
  switch (state) {
    case "thinking":
      return { speed: 3, amplitude: 1.6 };
    case "acting":
      return { speed: 3.4, amplitude: 1.6 };
    case "completed":
      return { speed: 0, amplitude: 1 };
    case "needs-attention":
    case "idle":
    default:
      return { speed: 1, amplitude: 1 };
  }
}

export type LayerOffsets = { phase: number; scalePhase: number };

export function randomLayerOffsets(): LayerOffsets[] {
  return BLOBS.map(() => ({
    phase: Math.random() * Math.PI * 2,
    scalePhase: Math.random() * Math.PI * 2,
  }));
}

const BASE_OMEGA = (Math.PI * 2) / IDLE_BASE_PERIOD_S;

export type OrbFrameState = {
  phase: number;
  speed: number;
  amplitude: number;
  targetSpeed: number;
  targetAmplitude: number;
  speedTween: null | { from: number; to: number; start: number; duration: number };
  pop: null | { start: number };
  orbScale: number;
  atRest: boolean;
};

export function createOrbFrameState(state: TruAIState): OrbFrameState {
  const t = targetsForState(state);
  return {
    phase: 0,
    speed: state === "completed" ? 0 : t.speed,
    amplitude: t.amplitude,
    targetSpeed: t.speed,
    targetAmplitude: t.amplitude,
    speedTween: null,
    pop: null,
    orbScale: 1,
    atRest: state === "completed",
  };
}

export function retargetOrb(frame: OrbFrameState, state: TruAIState, now: number) {
  const t = targetsForState(state);
  frame.targetAmplitude = t.amplitude;
  frame.atRest = false;

  if (state === "completed") {
    frame.speedTween = {
      from: frame.speed,
      to: 0,
      start: now,
      duration: COMPLETED_STOP_MS,
    };
    frame.targetSpeed = 0;
    frame.pop = { start: now };
    return;
  }

  if (Math.abs(frame.speed - t.speed) > 0.02) {
    frame.speedTween = {
      from: frame.speed,
      to: t.speed,
      start: now,
      duration: state === "idle" || state === "needs-attention" ? COMPLETED_RESUME_MS : 650,
    };
  }
  frame.targetSpeed = t.speed;
  frame.pop = null;
}

function smoothToward(current: number, target: number, dt: number, tau: number) {
  const a = 1 - Math.exp(-dt / Math.max(0.001, tau));
  return current + (target - current) * a;
}

export type LayerTransform = { transform: string };

function restTransform(blob: BlobDef): LayerTransform {
  const x = blob.homeX * ORB_SIZE;
  const y = blob.homeY * ORB_SIZE;
  return {
    transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(1)`,
  };
}

export function stepOrb(
  frame: OrbFrameState,
  offsets: LayerOffsets[],
  dt: number,
  now: number,
  reducedMotion: boolean,
): LayerTransform[] {
  if (reducedMotion) {
    frame.speed = 0;
    frame.amplitude = 1;
    frame.orbScale = 1;
    frame.atRest = true;
    return BLOBS.map((blob) => restTransform(blob));
  }

  if (frame.speedTween) {
    const u = Math.min(1, (now - frame.speedTween.start) / frame.speedTween.duration);
    const e = easeInOut(u);
    frame.speed = frame.speedTween.from + (frame.speedTween.to - frame.speedTween.from) * e;
    if (u >= 1) {
      frame.speed = frame.speedTween.to;
      frame.speedTween = null;
      if (frame.speed === 0 && !frame.pop) frame.atRest = true;
    }
  } else {
    frame.speed = smoothToward(frame.speed, frame.targetSpeed, dt, SMOOTH_TAU_S);
  }

  frame.amplitude = smoothToward(frame.amplitude, frame.targetAmplitude, dt, SMOOTH_TAU_S);

  if (frame.pop) {
    const u = Math.min(1, (now - frame.pop.start) / COMPLETED_POP_MS);
    if (u < 0.5) {
      frame.orbScale = 1 + 0.06 * easePop(u / 0.5);
    } else {
      frame.orbScale = 1.06 + (1 - 1.06) * easeOutSoft((u - 0.5) / 0.5);
    }
    if (u >= 1) {
      frame.orbScale = 1;
      frame.pop = null;
      if (frame.speed < 0.001) frame.atRest = true;
    }
  } else {
    frame.orbScale = 1;
  }

  if (frame.speed > 0.0005) {
    frame.phase += dt * frame.speed * BASE_OMEGA;
    frame.atRest = false;
  }

  return BLOBS.map((blob, i) => {
    const off = offsets[i]!;
    const t1 = frame.phase * blob.period + off.phase;
    const t2 = frame.phase * blob.period * 0.67 + off.scalePhase;
    const max = blob.travel * ORB_SIZE * frame.amplitude;
    // Gentle drift around home — no rotation (avoids the warped look)
    const dx = Math.sin(t1) * max * blob.ax;
    const dy = Math.cos(t1 * 0.74 + t2 * 0.2) * max * blob.ay;
    const sc = 1 + Math.sin(t2) * blob.scaleAmp * frame.amplitude;
    const scClamped = Math.min(1.08, Math.max(0.95, sc));
    const x = blob.homeX * ORB_SIZE + dx;
    const y = blob.homeY * ORB_SIZE + dy;
    return {
      transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scClamped.toFixed(4)})`,
    };
  });
}
