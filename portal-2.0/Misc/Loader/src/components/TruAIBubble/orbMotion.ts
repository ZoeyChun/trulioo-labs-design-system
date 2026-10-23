import type { TruAIState } from "./types";
import { easeInOut, easeOutSoft, easePop } from "./easings";

/** How quickly logoOrbit eases in/out — slower than mesh so warp can unfold. */
export const LOGO_ORBIT_TAU_S = 0.95;
/**
 * Acting enter from thinking: park the mark front without a residual orbit burst.
 * Faster than LOGO_ORBIT_TAU_S so warp folds away before chroma rises.
 */
export const ACTING_ORBIT_SETTLE_TAU_S = 0.42;
/** Acting chroma ease-in — slower than mesh so accents don't slam on. */
export const ACTING_SWIRL_TAU_S = 1.15;

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

/**
 * Acting-only accents — fade in with swirl (color wash).
 * Soft coral + periwinkle sit complementary / tertiary to the mint–teal body.
 * Travel is biased horizontal (ax ≫ ay) so chroma bands wash L↔R, not spin.
 */
export const ACTING_ACCENTS: readonly BlobDef[] = [
  {
    // Warm coral — complements teal, lifts the yellow side
    color: "#FF8E7A",
    size: 0.88,
    homeX: -0.3,
    homeY: 0.02,
    travel: 0.2,
    ax: 1.35,
    ay: 0.45,
    scaleAmp: 0.04,
    period: 1.55,
    opacity: 0.78,
  },
  {
    // Soft periwinkle — cool tertiary between cyan and violet
    color: "#A99BE8",
    size: 0.92,
    homeX: 0.16,
    homeY: -0.3,
    travel: 0.19,
    ax: 1.25,
    ay: 0.5,
    scaleAmp: 0.04,
    period: 1.92,
    opacity: 0.7,
  },
  {
    // Soft apricot highlight — bridges yellow ↔ coral
    color: "#FFC4A8",
    size: 0.72,
    homeX: 0.08,
    homeY: 0.32,
    travel: 0.18,
    ax: 1.3,
    ay: 0.4,
    scaleAmp: 0.035,
    period: 2.28,
    opacity: 0.62,
  },
] as const;

/** Base mesh + acting accents (accents stay at opacity 0 until swirl rises). */
export const ALL_BLOBS: readonly BlobDef[] = [...BLOBS, ...ACTING_ACCENTS];
export const BASE_BLOB_COUNT = BLOBS.length;

/** Idle: slowest layer ~16s */
export const IDLE_BASE_PERIOD_S = 16;
export const SMOOTH_TAU_S = 0.55;
/** Completed: mesh hard-stop ramp. */
export const COMPLETED_STOP_MS = 600;
/** Completed: logo landing scale 1 → peak → 1 (up/down split evenly). */
export const COMPLETED_POP_MS = 700;
export const COMPLETED_LANDING_PEAK = 1.06;
/** Faster orbit settle on completed so the mark “lands” front-center. */
export const COMPLETED_ORBIT_TAU_S = 0.32;
export const COMPLETED_RESUME_MS = 900;

/**
 * Logo mark — orbits on the sphere surface via CSS 3D strips.
 * Behind the sphere: fully hidden; reappears on the other side.
 * One revolution at logoSpin=1 takes LOGO_ORBIT_PERIOD_S seconds.
 */
export const LOGO_ORBIT_PERIOD_S = 2.6;
/** Sphere radius in px (logo sits on this surface). */
export const LOGO_SPHERE_R = ORB_SIZE / 2;
/**
 * Must match the CSS `perspective` on the logo host.
 * Front-facing translateZ(R) enlarges by perspective/(perspective−R);
 * surface artwork is pre-scaled by the inverse so the on-screen size
 * matches the original flat Figma placement.
 */
export const LOGO_PERSPECTIVE = 160;
/** Figma logo mark box on the 64px orb (left 19.53% / right 20.33% / top 25% / bottom 25.66%). */
export const LOGO_DESIGN_W = ORB_SIZE * (1 - 0.1953 - 0.2033);
export const LOGO_DESIGN_H = ORB_SIZE * (1 - 0.25 - 0.2566);
/** Cancel perspective magnification at the front of the sphere. */
export const LOGO_DEPTH_SCALE =
  (LOGO_PERSPECTIVE - LOGO_SPHERE_R) / LOGO_PERSPECTIVE;
/** Drawn size on the surface (before perspective). */
export const LOGO_W = LOGO_DESIGN_W * LOGO_DEPTH_SCALE;
export const LOGO_H = LOGO_DESIGN_H * LOGO_DEPTH_SCALE;
/**
 * Half-angle the logo spans on the sphere (arc-length match so
 * strip facets keep the mark’s proportions).
 */
export const LOGO_HALF_LON = LOGO_W / (2 * LOGO_SPHERE_R);
/** Vertical facets that approximate the curved surface. */
export const LOGO_STRIPS = 24;
/** Start at left rim so the first beat reads: left → behind → right. */
export const LOGO_PHASE_LEFT = -Math.PI / 2;

/** Idle logo: ±2° yaw round-trip (alive cue), then rest. */
export const IDLE_YAW_DEG = 2;
export const IDLE_YAW_MS = 2400;
export const IDLE_YAW_GAP_MIN_MS = 8000;
export const IDLE_YAW_GAP_MAX_MS = 12000;

/** Acting logo: short “nod” scale pulse on enter / label change (one-shot cue). */
export const ACTING_NOD_PEAK = 1.04;
export const ACTING_NOD_UP_MS = 160;
export const ACTING_NOD_DOWN_MS = 260;
export const ACTING_NOD_MS = ACTING_NOD_UP_MS + ACTING_NOD_DOWN_MS;

/**
 * Acting pulse breathe — whole-orb scale loop (logo stays front).
 * ~1.0 → peak → 1.0 over ACTING_BREATHE_PERIOD_S (cosine ease-in-out).
 * Slower + larger peak so the inhale/exhale reads clearly (KR feedback).
 */
export const ACTING_BREATHE_PEAK = 1.11;
export const ACTING_BREATHE_PERIOD_S = 2.2;

/** Needs attention: one ±3° yaw shake on enter (3 peaks), then rest. */
export const ATTENTION_SHAKE_DEG = 3;
export const ATTENTION_SHAKE_MS = 280;

export type OrbMotionTargets = {
  speed: number;
  amplitude: number;
  /** 0 = parked front-center, 1 = full left→back→right orbit */
  logoOrbit: number;
  /** Multiplier on LOGO_ORBIT_PERIOD_S */
  logoSpin: number;
  /**
   * 0 = gentle drift; 1 = acting chroma wash (accent fade-in + L↔R travel).
   * Field rotation is intentionally tiny — wash comes from blob travel, not spin.
   */
  swirl: number;
};

/**
 * Homepage landing orb: original Figma palette only (no acting accents),
 * logo parked, no size pulse — mesh drifts a step livelier than idle.
 */
export const HOME_LANDING_TARGETS: OrbMotionTargets = {
  speed: 2.2,
  amplitude: 1.55,
  logoOrbit: 0,
  logoSpin: 0,
  swirl: 0,
};

export function targetsForState(state: TruAIState): OrbMotionTargets {
  switch (state) {
    case "thinking":
      // logoSpin 1.35 → ~1.9s/rev (LOGO_ORBIT_PERIOD_S / 1.35)
      return { speed: 3, amplitude: 1.6, logoOrbit: 1, logoSpin: 1.35, swirl: 0.12 };
    case "acting":
      // Color wash + pulse breathe: logo parked front (no orbit/spin).
      // Swirl gates accent chroma; field rotation is nearly killed in stepOrb.
      // Amplitude carries gentle L↔R blob travel; breathe is orbScale, not nod.
      return { speed: 1.85, amplitude: 1.7, logoOrbit: 0, logoSpin: 0, swirl: 0.62 };
    case "completed":
      return { speed: 0, amplitude: 1, logoOrbit: 0, logoSpin: 0, swirl: 0 };
    case "needs-attention":
      // Logo parked front (shake is one-shot); mesh calm like idle.
      return { speed: 1, amplitude: 1, logoOrbit: 0, logoSpin: 0, swirl: 0 };
    case "idle":
    default:
      // Logo parked front; mesh breathes. Occasional yaw is stepped separately.
      return { speed: 1, amplitude: 1, logoOrbit: 0, logoSpin: 0, swirl: 0 };
  }
}

export function targetsForOrb(state: TruAIState, landing = false): OrbMotionTargets {
  if (landing) return HOME_LANDING_TARGETS;
  return targetsForState(state);
}

function idleYawGapMs() {
  return (
    IDLE_YAW_GAP_MIN_MS +
    Math.random() * (IDLE_YAW_GAP_MAX_MS - IDLE_YAW_GAP_MIN_MS)
  );
}

export type LayerOffsets = { phase: number; scalePhase: number };

export function randomLayerOffsets(): LayerOffsets[] {
  return ALL_BLOBS.map(() => ({
    phase: Math.random() * Math.PI * 2,
    scalePhase: Math.random() * Math.PI * 2,
  }));
}

const BASE_OMEGA = (Math.PI * 2) / IDLE_BASE_PERIOD_S;
const LOGO_OMEGA = (Math.PI * 2) / LOGO_ORBIT_PERIOD_S;

export type OrbFrameState = {
  phase: number;
  /**
   * Radians on the X-orbit (spins opposite the mesh drift).
   * −π/2 = left, −π = behind (hidden), −3π/2 = right, 0/−2π = front.
   */
  logoPhase: number;
  /** Current TruAI visual state — drives idle yaw vs orbit. */
  motionState: TruAIState;
  /** Homepage landing: livelier original-palette mesh, no accents / size pulse. */
  landing: boolean;
  speed: number;
  amplitude: number;
  logoOrbit: number;
  logoSpin: number;
  swirl: number;
  targetSpeed: number;
  targetAmplitude: number;
  targetLogoOrbit: number;
  targetLogoSpin: number;
  targetSwirl: number;
  speedTween: null | { from: number; to: number; start: number; duration: number };
  pop: null | { start: number };
  /** Idle ±yaw nudge in progress. */
  idleYawNudge: null | { start: number; duration: number };
  /** Next idle yaw nudge start time (ms). */
  idleYawNextAt: number;
  /** Extra rotateY on top of orbit longitude (idle alive cue). */
  idleYaw: number;
  /** Acting nod pulse in progress. */
  actingNod: null | { start: number };
  /** Needs-attention enter shake in progress. */
  attentionShake: null | { start: number };
  /** Logo local scale (acting nod / completed landing). */
  logoScale: number;
  orbScale: number;
  atRest: boolean;
};

export function createOrbFrameState(
  state: TruAIState,
  opts?: { landing?: boolean },
): OrbFrameState {
  const landing = opts?.landing ?? false;
  const t = targetsForOrb(state, landing);
  const now = typeof performance !== "undefined" ? performance.now() : 0;
  return {
    phase: 0,
    logoPhase:
      landing || state === "idle" || state === "completed" || state === "needs-attention"
        ? 0
        : LOGO_PHASE_LEFT,
    motionState: landing ? "idle" : state,
    landing,
    speed: state === "completed" && !landing ? 0 : t.speed,
    amplitude: t.amplitude,
    logoOrbit: t.logoOrbit,
    logoSpin: t.logoSpin,
    swirl: t.swirl,
    targetSpeed: t.speed,
    targetAmplitude: t.amplitude,
    targetLogoOrbit: t.logoOrbit,
    targetLogoSpin: t.logoSpin,
    targetSwirl: t.swirl,
    speedTween: null,
    pop: null,
    idleYawNudge: null,
    // First nudge soon so idle “alive” cue is easy to notice in the demo.
    idleYawNextAt: now + 900,
    idleYaw: 0,
    actingNod: !landing && state === "acting" ? { start: now } : null,
    attentionShake: !landing && state === "needs-attention" ? { start: now } : null,
    logoScale: 1,
    orbScale: 1,
    atRest: state === "completed",
  };
}

/** Fire the acting logo nod (enter acting, or acting label change). */
export function triggerActingNod(frame: OrbFrameState, now: number) {
  frame.actingNod = { start: now };
  frame.atRest = false;
}

export function retargetOrb(
  frame: OrbFrameState,
  state: TruAIState,
  now: number,
  opts?: { landing?: boolean; /** Multiplies logoSpin target. */ orbitRate?: number },
) {
  const landing = opts?.landing ?? false;
  const orbitRate = opts?.orbitRate ?? 1;
  const t = targetsForOrb(state, landing);
  frame.landing = landing;
  frame.motionState = landing ? "idle" : state;
  frame.targetAmplitude = t.amplitude;
  frame.targetLogoOrbit = t.logoOrbit;
  frame.targetLogoSpin = t.logoSpin * orbitRate;
  frame.targetSwirl = t.swirl;
  frame.atRest = false;

  // Leave idle yaw when switching away.
  if (frame.motionState !== "idle") {
    frame.idleYawNudge = null;
    frame.idleYaw = 0;
  } else {
    frame.idleYawNudge = null;
    frame.idleYaw = 0;
    frame.idleYawNextAt = now + idleYawGapMs() * 0.5;
  }

  if (!landing && state === "acting") {
    // Kill residual thinking orbit velocity immediately — orbit amp alone
    // blends the mark to front; continuing logoSpin reads as a mad enter spin.
    frame.logoSpin = 0;
    frame.targetLogoSpin = 0;
    triggerActingNod(frame, now);
  } else {
    frame.actingNod = null;
    if (!frame.pop) frame.logoScale = 1;
  }

  if (!landing && state === "needs-attention") {
    frame.attentionShake = { start: now };
  } else {
    frame.attentionShake = null;
  }

  // Thinking from a parked pose: cue left → behind (hidden) → right.
  if (!landing && state === "thinking" && frame.logoOrbit < 0.35) {
    frame.logoPhase = LOGO_PHASE_LEFT;
  }

  if (!landing && state === "completed") {
    // Mesh hard-stop + logo front landing (scale pop). Orbit/swirl already targeted 0.
    frame.speedTween = {
      from: frame.speed,
      to: 0,
      start: now,
      duration: COMPLETED_STOP_MS,
    };
    frame.targetSpeed = 0;
    frame.pop = { start: now };
    frame.logoScale = 1;
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

export type LogoPose = {
  /** Longitude of the logo center on the sphere (0 = front). */
  longitude: number;
  /** Extra Y rotation (idle alive cue), radians. */
  yaw: number;
  /** Local logo scale (acting nod). */
  scale: number;
  /** 0 = parked front, 1 = full orbit. */
  orbit: number;
  /**
   * 0 = flat original mark (idle / parked).
   * 1 = sphere-surface strip warp (only while the logo is moving on orbit).
   */
  warp: number;
  opacity: number;
  zIndex: number;
};

/** Resting pose: front-center, flat original mark. */
export function restLogoPose(): LogoPose {
  return {
    longitude: 0,
    yaw: 0,
    scale: 1,
    orbit: 0,
    warp: 0,
    opacity: 1,
    zIndex: 2,
  };
}

/**
 * Map frame → logo pose on the sphere.
 * Opposite spin is applied in stepOrb (phase decreases).
 * z ≤ 0 → hidden behind; z > 0 → visible on the front hemisphere.
 * Warp only engages while orbiting — idle stays the flat Figma mark.
 */
export function logoPoseForFrame(frame: OrbFrameState): LogoPose {
  const orbit = frame.logoOrbit;
  const θ = frame.logoPhase;
  // Blend toward front as orbit amp falls (completed / idle settle).
  const x = Math.sin(θ) * orbit;
  const z = Math.cos(θ) * orbit + (1 - orbit);
  const longitude = Math.atan2(x, z);

  let opacity = 1;
  if (orbit >= 0.02) {
    if (z <= 0) opacity = 0;
    else opacity = Math.min(1, z / 0.18);
  }

  // Idle stays flat; easeInOut so curvature eases in/out instead of linear snap.
  let warp = 0;
  if (orbit > 0.02) {
    const u = Math.min(1, (orbit - 0.02) / 0.78);
    warp = easeInOut(u);
  }

  return {
    longitude,
    yaw: frame.idleYaw,
    scale: frame.logoScale,
    orbit,
    warp: Number(warp.toFixed(4)),
    opacity: Number(opacity.toFixed(3)),
    zIndex: z >= 0 ? 2 : 0,
  };
}

/** Step the occasional idle ±2° yaw round-trip. */
function stepIdleYaw(frame: OrbFrameState, now: number) {
  if (frame.motionState !== "idle") {
    // Attention shake owns idleYaw while active.
    if (!frame.attentionShake) frame.idleYaw = 0;
    frame.idleYawNudge = null;
    return;
  }

  if (!frame.idleYawNudge) {
    if (now >= frame.idleYawNextAt) {
      frame.idleYawNudge = { start: now, duration: IDLE_YAW_MS };
    } else {
      frame.idleYaw = 0;
      return;
    }
  }

  const nudge = frame.idleYawNudge;
  const u = Math.min(1, (now - nudge.start) / nudge.duration);
  // One sine cycle: 0 → +2° → 0 → −2° → 0 (sine eases through the peaks).
  const amp = (IDLE_YAW_DEG * Math.PI) / 180;
  frame.idleYaw = amp * Math.sin(Math.PI * 2 * u);
  frame.atRest = false;

  if (u >= 1) {
    frame.idleYaw = 0;
    frame.idleYawNudge = null;
    frame.idleYawNextAt = now + idleYawGapMs();
  }
}

/** Acting logo nod: 1 → 1.04 → 1 over 420ms. */
function stepActingNod(frame: OrbFrameState, now: number) {
  if (!frame.actingNod) {
    // Don't stomp completed landing (pop drives logoScale).
    if (frame.motionState !== "acting" && !frame.pop) frame.logoScale = 1;
    return;
  }

  const elapsed = now - frame.actingNod.start;
  if (elapsed >= ACTING_NOD_MS) {
    frame.actingNod = null;
    frame.logoScale = 1;
    return;
  }

  frame.atRest = false;
  if (elapsed < ACTING_NOD_UP_MS) {
    const u = easeOutSoft(elapsed / ACTING_NOD_UP_MS);
    frame.logoScale = 1 + (ACTING_NOD_PEAK - 1) * u;
  } else {
    const u = easeOutSoft((elapsed - ACTING_NOD_UP_MS) / ACTING_NOD_DOWN_MS);
    frame.logoScale = ACTING_NOD_PEAK + (1 - ACTING_NOD_PEAK) * u;
  }
}

/** Needs attention: ±3° yaw with 3 peaks over 280ms, then rest. */
function stepAttentionShake(frame: OrbFrameState, now: number) {
  if (!frame.attentionShake) return;

  const u = Math.min(1, (now - frame.attentionShake.start) / ATTENTION_SHAKE_MS);
  const amp = (ATTENTION_SHAKE_DEG * Math.PI) / 180;
  // sin(3πu): three extrema (+ − +) then settle at 0.
  frame.idleYaw = amp * Math.sin(3 * Math.PI * u);
  frame.atRest = false;

  if (u >= 1) {
    frame.idleYaw = 0;
    frame.attentionShake = null;
  }
}

function smoothToward(current: number, target: number, dt: number, tau: number) {
  const a = 1 - Math.exp(-dt / Math.max(0.001, tau));
  return current + (target - current) * a;
}

export type LayerTransform = { transform: string; opacity: number };

export type OrbStepResult = {
  layers: LayerTransform[];
  logo: LogoPose;
};

function restTransform(blob: BlobDef): LayerTransform {
  const x = blob.homeX * ORB_SIZE;
  const y = blob.homeY * ORB_SIZE;
  return {
    transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(1)`,
    opacity: blob.opacity,
  };
}

export function stepOrb(
  frame: OrbFrameState,
  offsets: LayerOffsets[],
  dt: number,
  now: number,
  reducedMotion: boolean,
): OrbStepResult {
  if (reducedMotion) {
    frame.speed = 0;
    frame.amplitude = 1;
    frame.logoOrbit = 0;
    frame.logoSpin = 0;
    frame.idleYaw = 0;
    frame.idleYawNudge = null;
    frame.actingNod = null;
    frame.attentionShake = null;
    frame.logoScale = 1;
    frame.orbScale = 1;
    frame.atRest = true;
    return {
      layers: ALL_BLOBS.map((blob, i) =>
        i < BASE_BLOB_COUNT ? restTransform(blob) : { ...restTransform(blob), opacity: 0 },
      ),
      logo: restLogoPose(),
    };
  }

  if (frame.speedTween) {
    const u = Math.min(1, (now - frame.speedTween.start) / frame.speedTween.duration);
    const e = easeInOut(u);
    frame.speed = frame.speedTween.from + (frame.speedTween.to - frame.speedTween.from) * e;
    if (u >= 1) {
      frame.speed = frame.speedTween.to;
      frame.speedTween = null;
      if (frame.speed === 0 && !frame.pop && frame.logoOrbit < 0.02) frame.atRest = true;
    }
  } else {
    frame.speed = smoothToward(frame.speed, frame.targetSpeed, dt, SMOOTH_TAU_S);
  }

  frame.amplitude = smoothToward(frame.amplitude, frame.targetAmplitude, dt, SMOOTH_TAU_S);
  // Completed: clear acting chroma fast. Acting: ease chroma in gently (no slam).
  const swirlTau =
    frame.motionState === "completed"
      ? COMPLETED_ORBIT_TAU_S
      : frame.motionState === "acting" && frame.targetSwirl > frame.swirl
        ? ACTING_SWIRL_TAU_S
        : SMOOTH_TAU_S;
  frame.swirl = smoothToward(frame.swirl, frame.targetSwirl, dt, swirlTau);
  const orbitTau =
    frame.motionState === "completed"
      ? COMPLETED_ORBIT_TAU_S
      : frame.motionState === "acting" && frame.targetLogoOrbit < frame.logoOrbit
        ? ACTING_ORBIT_SETTLE_TAU_S
        : LOGO_ORBIT_TAU_S;
  frame.logoOrbit = smoothToward(frame.logoOrbit, frame.targetLogoOrbit, dt, orbitTau);
  frame.logoSpin = smoothToward(frame.logoSpin, frame.targetLogoSpin, dt, orbitTau);

  // Completed logo landing: 1 → 1.06 → 1 over 700ms (spec).
  // Acting: pulse breathe on orb root (logo stays front; nod is one-shot only).
  if (frame.pop) {
    frame.orbScale = 1;
    const u = Math.min(1, (now - frame.pop.start) / COMPLETED_POP_MS);
    if (u < 0.5) {
      frame.logoScale = 1 + (COMPLETED_LANDING_PEAK - 1) * easePop(u / 0.5);
    } else {
      frame.logoScale =
        COMPLETED_LANDING_PEAK +
        (1 - COMPLETED_LANDING_PEAK) * easeOutSoft((u - 0.5) / 0.5);
    }
    frame.atRest = false;
    if (u >= 1) {
      frame.logoScale = 1;
      frame.pop = null;
      if (frame.speed < 0.001 && frame.logoOrbit < 0.02) frame.atRest = true;
    }
  } else if (frame.motionState === "acting") {
    const ω = (Math.PI * 2) / ACTING_BREATHE_PERIOD_S;
    // Cosine ease-in-out: 1 → peak → 1 over ACTING_BREATHE_PERIOD_S.
    const breatheU = 0.5 - 0.5 * Math.cos((now / 1000) * ω);
    frame.orbScale = 1 + (ACTING_BREATHE_PEAK - 1) * breatheU;
    frame.atRest = false;
  } else {
    frame.orbScale = smoothToward(frame.orbScale, 1, dt, SMOOTH_TAU_S);
  }

  if (frame.speed > 0.0005) {
    frame.phase += dt * frame.speed * BASE_OMEGA;
    frame.atRest = false;
  }

  if (frame.logoSpin > 0.0005 && frame.logoOrbit > 0.01) {
    // Opposite direction to the mesh drift (clockwise on +X).
    frame.logoPhase -= dt * frame.logoSpin * LOGO_OMEGA;
    frame.atRest = false;
  }

  stepIdleYaw(frame, now);
  stepActingNod(frame, now);
  stepAttentionShake(frame, now);

  const swirl = frame.swirl;
  // Almost no swirl-field rotation — chroma should wash, not spin.
  const swirlAng = frame.phase * (0.006 + 0.01 * swirl);
  const cosS = Math.cos(swirlAng);
  const sinS = Math.sin(swirlAng);
  const scaleBoost = 1 + 0.1 * swirl;
  // Shared L↔R wash carrier (slow, calm band travel across the orb).
  const washX = Math.sin(frame.phase * 0.55) * ORB_SIZE * 0.055 * swirl;

  const layers = ALL_BLOBS.map((blob, i) => {
    const off = offsets[i]!;
    const isAccent = i >= BASE_BLOB_COUNT;
    const t1 = frame.phase * blob.period + off.phase;
    const t2 = frame.phase * blob.period * 0.67 + off.scalePhase;
    const max = blob.travel * ORB_SIZE * frame.amplitude;
    // Base drift around home (accents already ax-biased for L↔R).
    let dx = Math.sin(t1) * max * blob.ax;
    let dy = Math.cos(t1 * 0.74 + t2 * 0.2) * max * blob.ay;
    if (swirl > 0.01) {
      // Tiny residual rotate so layers don't look rigidly locked — not a spin.
      const rdx = dx * cosS - dy * sinS;
      const rdy = dx * sinS + dy * cosS;
      const mix = swirl * 0.12;
      dx = dx + (rdx - dx) * mix;
      dy = dy + (rdy - dy) * mix;
      // Color wash: accents ride a stronger horizontal band; base mesh softer.
      const washAmp = isAccent ? 1.15 : 0.35;
      dx += washX * washAmp;
      // Phase-offset secondary wash so coral / periwinkle / apricot stagger.
      if (isAccent) {
        dx += Math.sin(t1 * 0.42 + i * 1.1) * ORB_SIZE * 0.04 * swirl;
      }
    }
    const sc = 1 + Math.sin(t2) * blob.scaleAmp * frame.amplitude * scaleBoost;
    const scClamped = Math.min(1.12, Math.max(0.92, sc));
    const x = blob.homeX * ORB_SIZE + dx;
    const y = blob.homeY * ORB_SIZE + dy;
    // Linear gate so accents still read at the acting swirl target.
    const accentGate = isAccent ? swirl : 1;
    const breathe = 1 + swirl * (isAccent ? 0.14 : 0.06) * Math.sin(t1 * 0.85 + i * 0.55);
    const opacity = blob.opacity * accentGate * breathe;
    const opacityClamped = isAccent
      ? Math.min(1, Math.max(0, opacity))
      : Math.min(1, Math.max(0.4, opacity));
    return {
      transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scClamped.toFixed(4)})`,
      opacity: Number(opacityClamped.toFixed(3)),
    };
  });

  return { layers, logo: logoPoseForFrame(frame) };
}
