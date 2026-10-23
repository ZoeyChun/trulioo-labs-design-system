/* Generated from Misc/Loader TruAIBubble/orbMotion.ts — same motion as the truai-bubble experiment. */
"use strict";
var TruAIOrbMotion = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // portal-2.0/Misc/Loader/src/components/TruAIBubble/orbMotion.ts
  var orbMotion_exports = {};
  __export(orbMotion_exports, {
    ACTING_ACCENTS: () => ACTING_ACCENTS,
    ACTING_BREATHE_PEAK: () => ACTING_BREATHE_PEAK,
    ACTING_BREATHE_PERIOD_S: () => ACTING_BREATHE_PERIOD_S,
    ACTING_NOD_DOWN_MS: () => ACTING_NOD_DOWN_MS,
    ACTING_NOD_MS: () => ACTING_NOD_MS,
    ACTING_NOD_PEAK: () => ACTING_NOD_PEAK,
    ACTING_NOD_UP_MS: () => ACTING_NOD_UP_MS,
    ACTING_ORBIT_SETTLE_TAU_S: () => ACTING_ORBIT_SETTLE_TAU_S,
    ACTING_SWIRL_TAU_S: () => ACTING_SWIRL_TAU_S,
    ALL_BLOBS: () => ALL_BLOBS,
    ATTENTION_SHAKE_DEG: () => ATTENTION_SHAKE_DEG,
    ATTENTION_SHAKE_MS: () => ATTENTION_SHAKE_MS,
    BASE_BLOB_COUNT: () => BASE_BLOB_COUNT,
    BLOBS: () => BLOBS,
    COMPLETED_LANDING_PEAK: () => COMPLETED_LANDING_PEAK,
    COMPLETED_ORBIT_TAU_S: () => COMPLETED_ORBIT_TAU_S,
    COMPLETED_POP_MS: () => COMPLETED_POP_MS,
    COMPLETED_RESUME_MS: () => COMPLETED_RESUME_MS,
    COMPLETED_STOP_MS: () => COMPLETED_STOP_MS,
    HOME_LANDING_TARGETS: () => HOME_LANDING_TARGETS,
    IDLE_BASE_PERIOD_S: () => IDLE_BASE_PERIOD_S,
    IDLE_YAW_DEG: () => IDLE_YAW_DEG,
    IDLE_YAW_GAP_MAX_MS: () => IDLE_YAW_GAP_MAX_MS,
    IDLE_YAW_GAP_MIN_MS: () => IDLE_YAW_GAP_MIN_MS,
    IDLE_YAW_MS: () => IDLE_YAW_MS,
    LOGO_DEPTH_SCALE: () => LOGO_DEPTH_SCALE,
    LOGO_DESIGN_H: () => LOGO_DESIGN_H,
    LOGO_DESIGN_W: () => LOGO_DESIGN_W,
    LOGO_H: () => LOGO_H,
    LOGO_HALF_LON: () => LOGO_HALF_LON,
    LOGO_ORBIT_PERIOD_S: () => LOGO_ORBIT_PERIOD_S,
    LOGO_ORBIT_TAU_S: () => LOGO_ORBIT_TAU_S,
    LOGO_PERSPECTIVE: () => LOGO_PERSPECTIVE,
    LOGO_PHASE_LEFT: () => LOGO_PHASE_LEFT,
    LOGO_SPHERE_R: () => LOGO_SPHERE_R,
    LOGO_STRIPS: () => LOGO_STRIPS,
    LOGO_W: () => LOGO_W,
    ORB_BASE: () => ORB_BASE,
    ORB_BLUR_PX: () => ORB_BLUR_PX,
    ORB_OVERLAP: () => ORB_OVERLAP,
    ORB_SIZE: () => ORB_SIZE,
    SMOOTH_TAU_S: () => SMOOTH_TAU_S,
    createOrbFrameState: () => createOrbFrameState,
    logoPoseForFrame: () => logoPoseForFrame,
    randomLayerOffsets: () => randomLayerOffsets,
    restLogoPose: () => restLogoPose,
    retargetOrb: () => retargetOrb,
    stepOrb: () => stepOrb,
    targetsForOrb: () => targetsForOrb,
    targetsForState: () => targetsForState,
    triggerActingNod: () => triggerActingNod
  });

  // portal-2.0/Misc/Loader/src/components/TruAIBubble/easings.ts
  var EASE_CSS = {
    loop: [0.37, 0, 0.63, 1],
    outSoft: [0.22, 1, 0.36, 1],
    inOut: [0.65, 0, 0.35, 1],
    pop: [0.34, 1.56, 0.64, 1]
  };
  function cubicBezier(t, x1, y1, x2, y2) {
    const clamped = Math.min(1, Math.max(0, t));
    let u = clamped;
    for (let i = 0; i < 6; i += 1) {
      const x = sampleBezier(u, x1, x2) - clamped;
      const dx = sampleBezierDeriv(u, x1, x2);
      if (Math.abs(dx) < 1e-6) break;
      u -= x / dx;
    }
    return sampleBezier(u, y1, y2);
  }
  function sampleBezier(t, a, b) {
    const u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  }
  function sampleBezierDeriv(t, a, b) {
    const u = 1 - t;
    return 3 * u * u * a + 6 * u * t * (b - a) + 3 * t * t * (1 - b);
  }
  function easeInOut(t) {
    const [x1, y1, x2, y2] = EASE_CSS.inOut;
    return cubicBezier(t, x1, y1, x2, y2);
  }
  function easeOutSoft(t) {
    const [x1, y1, x2, y2] = EASE_CSS.outSoft;
    return cubicBezier(t, x1, y1, x2, y2);
  }
  function easePop(t) {
    const [x1, y1, x2, y2] = EASE_CSS.pop;
    return cubicBezier(t, x1, y1, x2, y2);
  }

  // portal-2.0/Misc/Loader/src/components/TruAIBubble/orbMotion.ts
  var LOGO_ORBIT_TAU_S = 0.95;
  var ACTING_ORBIT_SETTLE_TAU_S = 0.42;
  var ACTING_SWIRL_TAU_S = 1.15;
  var ORB_SIZE = 64;
  var ORB_OVERLAP = -4;
  var ORB_BASE = "#9EDFB6";
  var ORB_BLUR_PX = 12;
  var BLOBS = [
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
      opacity: 0.8
    },
    {
      // p10 / p11 / p21 — mint body
      color: "#9EDFB6",
      size: 1.15,
      homeX: 0,
      homeY: -0.06,
      travel: 0.11,
      ax: 0.95,
      ay: 1,
      scaleAmp: 0.03,
      period: 1.37,
      opacity: 0.75
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
      opacity: 0.85
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
      opacity: 0.45
    },
    {
      // p22 — mid teal
      color: "#33A68C",
      size: 1,
      homeX: 0.06,
      homeY: 0.2,
      travel: 0.12,
      ax: 0.9,
      ay: 1.05,
      scaleAmp: 0.035,
      period: 2.41,
      opacity: 0.8
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
      opacity: 0.78
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
      opacity: 0.75
    }
  ];
  var ACTING_ACCENTS = [
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
      opacity: 0.78
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
      opacity: 0.7
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
      opacity: 0.62
    }
  ];
  var ALL_BLOBS = [...BLOBS, ...ACTING_ACCENTS];
  var BASE_BLOB_COUNT = BLOBS.length;
  var IDLE_BASE_PERIOD_S = 16;
  var SMOOTH_TAU_S = 0.55;
  var COMPLETED_STOP_MS = 600;
  var COMPLETED_POP_MS = 700;
  var COMPLETED_LANDING_PEAK = 1.06;
  var COMPLETED_ORBIT_TAU_S = 0.32;
  var COMPLETED_RESUME_MS = 900;
  var LOGO_ORBIT_PERIOD_S = 2.6;
  var LOGO_SPHERE_R = ORB_SIZE / 2;
  var LOGO_PERSPECTIVE = 160;
  var LOGO_DESIGN_W = ORB_SIZE * (1 - 0.1953 - 0.2033);
  var LOGO_DESIGN_H = ORB_SIZE * (1 - 0.25 - 0.2566);
  var LOGO_DEPTH_SCALE = (LOGO_PERSPECTIVE - LOGO_SPHERE_R) / LOGO_PERSPECTIVE;
  var LOGO_W = LOGO_DESIGN_W * LOGO_DEPTH_SCALE;
  var LOGO_H = LOGO_DESIGN_H * LOGO_DEPTH_SCALE;
  var LOGO_HALF_LON = LOGO_W / (2 * LOGO_SPHERE_R);
  var LOGO_STRIPS = 24;
  var LOGO_PHASE_LEFT = -Math.PI / 2;
  var IDLE_YAW_DEG = 2;
  var IDLE_YAW_MS = 2400;
  var IDLE_YAW_GAP_MIN_MS = 8e3;
  var IDLE_YAW_GAP_MAX_MS = 12e3;
  var ACTING_NOD_PEAK = 1.04;
  var ACTING_NOD_UP_MS = 160;
  var ACTING_NOD_DOWN_MS = 260;
  var ACTING_NOD_MS = ACTING_NOD_UP_MS + ACTING_NOD_DOWN_MS;
  var ACTING_BREATHE_PEAK = 1.11;
  var ACTING_BREATHE_PERIOD_S = 2.2;
  var ATTENTION_SHAKE_DEG = 3;
  var ATTENTION_SHAKE_MS = 280;
  var HOME_LANDING_TARGETS = {
    speed: 2.2,
    amplitude: 1.55,
    logoOrbit: 0,
    logoSpin: 0,
    swirl: 0
  };
  function targetsForState(state) {
    switch (state) {
      case "thinking":
        return { speed: 3, amplitude: 1.6, logoOrbit: 1, logoSpin: 1.35, swirl: 0.12 };
      case "acting":
        return { speed: 1.85, amplitude: 1.7, logoOrbit: 0, logoSpin: 0, swirl: 0.62 };
      case "completed":
        return { speed: 0, amplitude: 1, logoOrbit: 0, logoSpin: 0, swirl: 0 };
      case "needs-attention":
        return { speed: 1, amplitude: 1, logoOrbit: 0, logoSpin: 0, swirl: 0 };
      case "idle":
      default:
        return { speed: 1, amplitude: 1, logoOrbit: 0, logoSpin: 0, swirl: 0 };
    }
  }
  function targetsForOrb(state, landing = false) {
    if (landing) return HOME_LANDING_TARGETS;
    return targetsForState(state);
  }
  function idleYawGapMs() {
    return IDLE_YAW_GAP_MIN_MS + Math.random() * (IDLE_YAW_GAP_MAX_MS - IDLE_YAW_GAP_MIN_MS);
  }
  function randomLayerOffsets() {
    return ALL_BLOBS.map(() => ({
      phase: Math.random() * Math.PI * 2,
      scalePhase: Math.random() * Math.PI * 2
    }));
  }
  var BASE_OMEGA = Math.PI * 2 / IDLE_BASE_PERIOD_S;
  var LOGO_OMEGA = Math.PI * 2 / LOGO_ORBIT_PERIOD_S;
  function createOrbFrameState(state, opts) {
    const landing = opts?.landing ?? false;
    const t = targetsForOrb(state, landing);
    const now = typeof performance !== "undefined" ? performance.now() : 0;
    return {
      phase: 0,
      logoPhase: landing || state === "idle" || state === "completed" || state === "needs-attention" ? 0 : LOGO_PHASE_LEFT,
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
      atRest: state === "completed"
    };
  }
  function triggerActingNod(frame, now) {
    frame.actingNod = { start: now };
    frame.atRest = false;
  }
  function retargetOrb(frame, state, now, opts) {
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
    if (frame.motionState !== "idle") {
      frame.idleYawNudge = null;
      frame.idleYaw = 0;
    } else {
      frame.idleYawNudge = null;
      frame.idleYaw = 0;
      frame.idleYawNextAt = now + idleYawGapMs() * 0.5;
    }
    if (!landing && state === "acting") {
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
    if (!landing && state === "thinking" && frame.logoOrbit < 0.35) {
      frame.logoPhase = LOGO_PHASE_LEFT;
    }
    if (!landing && state === "completed") {
      frame.speedTween = {
        from: frame.speed,
        to: 0,
        start: now,
        duration: COMPLETED_STOP_MS
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
        duration: state === "idle" || state === "needs-attention" ? COMPLETED_RESUME_MS : 650
      };
    }
    frame.targetSpeed = t.speed;
    frame.pop = null;
  }
  function restLogoPose() {
    return {
      longitude: 0,
      yaw: 0,
      scale: 1,
      orbit: 0,
      warp: 0,
      opacity: 1,
      zIndex: 2
    };
  }
  function logoPoseForFrame(frame) {
    const orbit = frame.logoOrbit;
    const \u03B8 = frame.logoPhase;
    const x = Math.sin(\u03B8) * orbit;
    const z = Math.cos(\u03B8) * orbit + (1 - orbit);
    const longitude = Math.atan2(x, z);
    let opacity = 1;
    if (orbit >= 0.02) {
      if (z <= 0) opacity = 0;
      else opacity = Math.min(1, z / 0.18);
    }
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
      zIndex: z >= 0 ? 2 : 0
    };
  }
  function stepIdleYaw(frame, now) {
    if (frame.motionState !== "idle") {
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
    const amp = IDLE_YAW_DEG * Math.PI / 180;
    frame.idleYaw = amp * Math.sin(Math.PI * 2 * u);
    frame.atRest = false;
    if (u >= 1) {
      frame.idleYaw = 0;
      frame.idleYawNudge = null;
      frame.idleYawNextAt = now + idleYawGapMs();
    }
  }
  function stepActingNod(frame, now) {
    if (!frame.actingNod) {
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
  function stepAttentionShake(frame, now) {
    if (!frame.attentionShake) return;
    const u = Math.min(1, (now - frame.attentionShake.start) / ATTENTION_SHAKE_MS);
    const amp = ATTENTION_SHAKE_DEG * Math.PI / 180;
    frame.idleYaw = amp * Math.sin(3 * Math.PI * u);
    frame.atRest = false;
    if (u >= 1) {
      frame.idleYaw = 0;
      frame.attentionShake = null;
    }
  }
  function smoothToward(current, target, dt, tau) {
    const a = 1 - Math.exp(-dt / Math.max(1e-3, tau));
    return current + (target - current) * a;
  }
  function restTransform(blob) {
    const x = blob.homeX * ORB_SIZE;
    const y = blob.homeY * ORB_SIZE;
    return {
      transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(1)`,
      opacity: blob.opacity
    };
  }
  function stepOrb(frame, offsets, dt, now, reducedMotion) {
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
        layers: ALL_BLOBS.map(
          (blob, i) => i < BASE_BLOB_COUNT ? restTransform(blob) : { ...restTransform(blob), opacity: 0 }
        ),
        logo: restLogoPose()
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
    const swirlTau = frame.motionState === "completed" ? COMPLETED_ORBIT_TAU_S : frame.motionState === "acting" && frame.targetSwirl > frame.swirl ? ACTING_SWIRL_TAU_S : SMOOTH_TAU_S;
    frame.swirl = smoothToward(frame.swirl, frame.targetSwirl, dt, swirlTau);
    const orbitTau = frame.motionState === "completed" ? COMPLETED_ORBIT_TAU_S : frame.motionState === "acting" && frame.targetLogoOrbit < frame.logoOrbit ? ACTING_ORBIT_SETTLE_TAU_S : LOGO_ORBIT_TAU_S;
    frame.logoOrbit = smoothToward(frame.logoOrbit, frame.targetLogoOrbit, dt, orbitTau);
    frame.logoSpin = smoothToward(frame.logoSpin, frame.targetLogoSpin, dt, orbitTau);
    if (frame.pop) {
      frame.orbScale = 1;
      const u = Math.min(1, (now - frame.pop.start) / COMPLETED_POP_MS);
      if (u < 0.5) {
        frame.logoScale = 1 + (COMPLETED_LANDING_PEAK - 1) * easePop(u / 0.5);
      } else {
        frame.logoScale = COMPLETED_LANDING_PEAK + (1 - COMPLETED_LANDING_PEAK) * easeOutSoft((u - 0.5) / 0.5);
      }
      frame.atRest = false;
      if (u >= 1) {
        frame.logoScale = 1;
        frame.pop = null;
        if (frame.speed < 1e-3 && frame.logoOrbit < 0.02) frame.atRest = true;
      }
    } else if (frame.motionState === "acting") {
      const \u03C9 = Math.PI * 2 / ACTING_BREATHE_PERIOD_S;
      const breatheU = 0.5 - 0.5 * Math.cos(now / 1e3 * \u03C9);
      frame.orbScale = 1 + (ACTING_BREATHE_PEAK - 1) * breatheU;
      frame.atRest = false;
    } else {
      frame.orbScale = smoothToward(frame.orbScale, 1, dt, SMOOTH_TAU_S);
    }
    if (frame.speed > 5e-4) {
      frame.phase += dt * frame.speed * BASE_OMEGA;
      frame.atRest = false;
    }
    if (frame.logoSpin > 5e-4 && frame.logoOrbit > 0.01) {
      frame.logoPhase -= dt * frame.logoSpin * LOGO_OMEGA;
      frame.atRest = false;
    }
    stepIdleYaw(frame, now);
    stepActingNod(frame, now);
    stepAttentionShake(frame, now);
    const swirl = frame.swirl;
    const swirlAng = frame.phase * (6e-3 + 0.01 * swirl);
    const cosS = Math.cos(swirlAng);
    const sinS = Math.sin(swirlAng);
    const scaleBoost = 1 + 0.1 * swirl;
    const washX = Math.sin(frame.phase * 0.55) * ORB_SIZE * 0.055 * swirl;
    const layers = ALL_BLOBS.map((blob, i) => {
      const off = offsets[i];
      const isAccent = i >= BASE_BLOB_COUNT;
      const t1 = frame.phase * blob.period + off.phase;
      const t2 = frame.phase * blob.period * 0.67 + off.scalePhase;
      const max = blob.travel * ORB_SIZE * frame.amplitude;
      let dx = Math.sin(t1) * max * blob.ax;
      let dy = Math.cos(t1 * 0.74 + t2 * 0.2) * max * blob.ay;
      if (swirl > 0.01) {
        const rdx = dx * cosS - dy * sinS;
        const rdy = dx * sinS + dy * cosS;
        const mix = swirl * 0.12;
        dx = dx + (rdx - dx) * mix;
        dy = dy + (rdy - dy) * mix;
        const washAmp = isAccent ? 1.15 : 0.35;
        dx += washX * washAmp;
        if (isAccent) {
          dx += Math.sin(t1 * 0.42 + i * 1.1) * ORB_SIZE * 0.04 * swirl;
        }
      }
      const sc = 1 + Math.sin(t2) * blob.scaleAmp * frame.amplitude * scaleBoost;
      const scClamped = Math.min(1.12, Math.max(0.92, sc));
      const x = blob.homeX * ORB_SIZE + dx;
      const y = blob.homeY * ORB_SIZE + dy;
      const accentGate = isAccent ? swirl : 1;
      const breathe = 1 + swirl * (isAccent ? 0.14 : 0.06) * Math.sin(t1 * 0.85 + i * 0.55);
      const opacity = blob.opacity * accentGate * breathe;
      const opacityClamped = isAccent ? Math.min(1, Math.max(0, opacity)) : Math.min(1, Math.max(0.4, opacity));
      return {
        transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scClamped.toFixed(4)})`,
        opacity: Number(opacityClamped.toFixed(3))
      };
    });
    return { layers, logo: logoPoseForFrame(frame) };
  }
  return __toCommonJS(orbMotion_exports);
})();
