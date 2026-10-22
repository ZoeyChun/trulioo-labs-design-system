"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import type { TruAIState } from "./types";
import { easeInOut, easeOutSoft } from "./easings";
import {
  ALL_BLOBS,
  BASE_BLOB_COUNT,
  LOGO_DESIGN_H,
  LOGO_DESIGN_W,
  LOGO_H,
  LOGO_HALF_LON,
  LOGO_PERSPECTIVE,
  LOGO_SPHERE_R,
  LOGO_STRIPS,
  LOGO_W,
  ORB_BASE,
  ORB_BLUR_PX,
  ORB_SIZE,
  createOrbFrameState,
  randomLayerOffsets,
  restLogoPose,
  retargetOrb,
  stepOrb,
  triggerActingNod,
  type LogoPose,
} from "./orbMotion";

/** Figma Icon/Blue-700 — one strip mesh morphs flat ↔ sphere (no dual-layer fade). */
const RING_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/figma/truai-bubble-orb-ring.svg`;

type TruAIOrbProps = {
  state: TruAIState;
  /** When this changes while acting, replay the logo nod. */
  actingKey?: string;
  reducedMotion?: boolean;
  className?: string;
};

const STRIP_ANGLE = (2 * LOGO_HALF_LON) / LOGO_STRIPS;
/** Flat facet width on the sphere (warped). */
const WARP_STRIP_W = 2 * LOGO_SPHERE_R * Math.tan(STRIP_ANGLE / 2);
const WARP_SLICE_W = LOGO_W / LOGO_STRIPS;
/** Flat facet width in the original Figma mark (parked). */
const FLAT_STRIP_W = LOGO_DESIGN_W / LOGO_STRIPS;
const FLAT_SLICE_W = LOGO_DESIGN_W / LOGO_STRIPS;

export function TruAIOrb({
  state,
  actingKey,
  reducedMotion = false,
  className,
}: TruAIOrbProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoHostRef = useRef<HTMLDivElement>(null);
  const logoPivotRef = useRef<HTMLDivElement>(null);
  const flatLogoRef = useRef<HTMLDivElement>(null);
  const stripsHostRef = useRef<HTMLDivElement>(null);
  const blurHostRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const frameRef = useRef(createOrbFrameState(state));
  const offsetsRef = useRef(randomLayerOffsets());
  const stateRef = useRef(state);
  const actingKeyRef = useRef(actingKey);
  const reducedRef = useRef(reducedMotion);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const animatingRef = useRef(false);

  const strips = useMemo(
    () =>
      Array.from({ length: LOGO_STRIPS }, (_, i) => ({
        i,
        angle: -LOGO_HALF_LON + (i + 0.5) * STRIP_ANGLE,
      })),
    [],
  );

  useEffect(() => {
    reducedRef.current = reducedMotion;
    if (reducedMotion) {
      frameRef.current.atRest = true;
      frameRef.current.speed = 0;
      frameRef.current.logoSpin = 0;
      frameRef.current.logoOrbit = 0;
    } else if (stateRef.current !== "completed") {
      frameRef.current.atRest = false;
    }
  }, [reducedMotion]);

  useEffect(() => {
    const prev = stateRef.current;
    stateRef.current = state;
    if (prev !== state) {
      retargetOrb(frameRef.current, state, performance.now());
    }
  }, [state]);

  useEffect(() => {
    const prev = actingKeyRef.current;
    actingKeyRef.current = actingKey;
    if (prev === actingKey) return;
    if (stateRef.current !== "acting") return;
    // First key while entering acting is handled by retargetOrb — skip double nod.
    if (prev === undefined) return;
    // Label swap while already acting — nod again, don't retarget mesh.
    triggerActingNod(frameRef.current, performance.now());
  }, [actingKey]);

  useEffect(() => {
    function setWillChange(on: boolean) {
      if (animatingRef.current === on) return;
      animatingRef.current = on;
      for (const el of layerRefs.current) {
        if (el) el.style.willChange = on ? "transform" : "auto";
      }
      if (logoPivotRef.current) {
        logoPivotRef.current.style.willChange = on ? "transform" : "auto";
      }
      for (const el of stripRefs.current) {
        if (el) el.style.willChange = on ? "transform" : "auto";
      }
    }

    function applyLogo(pose: LogoPose) {
      const host = logoHostRef.current;
      const pivot = logoPivotRef.current;
      if (!host || !pivot) return;

      host.style.opacity = String(pose.opacity);
      host.style.zIndex = String(pose.zIndex);
      // Perspective only while warping — keeps the parked mark truly flat.
      host.style.perspective = pose.warp < 0.02 ? "none" : `${LOGO_PERSPECTIVE}px`;
      pivot.style.transform = `rotateY(${pose.longitude + pose.yaw}rad) scale(${pose.scale})`;

      const t = pose.warp;
      // Parked: crisp single SVG. Orbiting: strip mesh. Exclusive switch — no dual fade
      // (avoids the old “reflection” ghost; strips alone mush dots at ~1.6px each).
      const useFlat = t < 0.02;
      const flat = flatLogoRef.current;
      const stripsHost = stripsHostRef.current;
      if (flat) {
        flat.style.opacity = useFlat ? "1" : "0";
        flat.style.visibility = useFlat ? "visible" : "hidden";
      }
      if (stripsHost) {
        stripsHost.style.opacity = useFlat ? "0" : "1";
        stripsHost.style.visibility = useFlat ? "hidden" : "visible";
      }
      if (useFlat) return;

      // Multi-channel morph: lift off the plane first, then fan onto the sphere,
      // while the flat layout gathers toward center — reads like paper curling.
      const lift = easeOutSoft(t);
      const fan = easeInOut(t);
      const gather = easeInOut(t);
      const sizeT = easeInOut(t);

      const stripW = FLAT_STRIP_W + (WARP_STRIP_W - FLAT_STRIP_W) * sizeT;
      const markW = LOGO_DESIGN_W + (LOGO_W - LOGO_DESIGN_W) * sizeT;
      const markH = LOGO_DESIGN_H + (LOGO_H - LOGO_DESIGN_H) * sizeT;
      const sliceW = FLAT_SLICE_W + (WARP_SLICE_W - FLAT_SLICE_W) * sizeT;

      for (let i = 0; i < LOGO_STRIPS; i += 1) {
        const stripEl = stripRefs.current[i];
        const sliceEl = sliceRefs.current[i];
        if (!stripEl || !sliceEl) continue;

        const angle = strips[i]!.angle * fan;
        const z = LOGO_SPHERE_R * lift;
        const flatX = -LOGO_DESIGN_W / 2 + (i + 0.5) * FLAT_STRIP_W;
        const x = flatX * (1 - gather);

        stripEl.style.width = `${stripW}px`;
        stripEl.style.height = `${markH}px`;
        stripEl.style.transform = `translateX(${x.toFixed(2)}px) rotateY(${angle}rad) translateZ(${z.toFixed(2)}px) translate(-50%, -50%)`;

        sliceEl.style.width = `${markW}px`;
        sliceEl.style.height = `${markH}px`;
        sliceEl.style.marginLeft = `${(-i * sliceW).toFixed(2)}px`;
        sliceEl.style.webkitMaskSize = `${markW}px ${markH}px`;
        sliceEl.style.maskSize = `${markW}px ${markH}px`;
      }
    }

    function apply(result: ReturnType<typeof stepOrb>) {
      result.layers.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        el.style.transform = layer.transform;
        el.style.opacity = String(layer.opacity);
      });
      applyLogo(result.logo);
      const root = rootRef.current;
      if (root) root.style.transform = `scale(${frameRef.current.orbScale})`;
      // Acting: sharpen a touch so coral/periwinkle bands separate (ref-like chroma).
      const blur = blurHostRef.current;
      if (blur) {
        const swirl = frameRef.current.swirl;
        blur.style.filter = `blur(${(ORB_BLUR_PX * (1 - 0.28 * swirl)).toFixed(2)}px)`;
        blur.style.transform = `scale(${(1.15 + 0.03 * swirl).toFixed(3)})`;
      }
    }

    function tick(now: number) {
      const hidden = typeof document !== "undefined" && document.visibilityState === "hidden";
      const frame = frameRef.current;
      const reduced = reducedRef.current;

      if (hidden) {
        setWillChange(false);
        lastRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const shouldStep =
        reduced ||
        !frame.atRest ||
        !!frame.pop ||
        !!frame.speedTween ||
        frame.speed > 0.0005 ||
        frame.logoSpin > 0.0005 ||
        frame.logoOrbit > 0.01 ||
        !!frame.idleYawNudge ||
        !!frame.actingNod ||
        !!frame.attentionShake ||
        Math.abs(frame.idleYaw) > 0.0001 ||
        Math.abs(frame.logoScale - 1) > 0.0005 ||
        Math.abs(frame.orbScale - 1) > 0.0005 ||
        Math.abs(frame.speed - frame.targetSpeed) > 0.001 ||
        Math.abs(frame.amplitude - frame.targetAmplitude) > 0.001 ||
        Math.abs(frame.logoOrbit - frame.targetLogoOrbit) > 0.001 ||
        Math.abs(frame.logoSpin - frame.targetLogoSpin) > 0.001 ||
        Math.abs(frame.swirl - frame.targetSwirl) > 0.001 ||
        frame.swirl > 0.02 ||
        frame.motionState === "acting";

      if (!shouldStep) {
        setWillChange(false);
        lastRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      let dt = lastRef.current ? (now - lastRef.current) / 1000 : 1 / 60;
      if (dt > 0.05) dt = 0.05;
      if (dt < 0) dt = 0;
      lastRef.current = now;

      apply(stepOrb(frame, offsetsRef.current, dt, now, reduced));
      setWillChange(
        !reduced &&
          (frame.speed > 0.001 ||
            frame.logoSpin > 0.001 ||
            frame.logoOrbit > 0.02 ||
            !!frame.idleYawNudge ||
            !!frame.actingNod ||
            !!frame.attentionShake ||
            !!frame.pop ||
            !!frame.speedTween),
      );
      rafRef.current = requestAnimationFrame(tick);
    }

    apply(stepOrb(frameRef.current, offsetsRef.current, 0, performance.now(), reducedRef.current));
    rafRef.current = requestAnimationFrame(tick);

    function onVisibility() {
      if (document.visibilityState === "visible") lastRef.current = 0;
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [strips]);

  const initial = restLogoPose();

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn("pointer-events-none relative shrink-0", className)}
      style={{
        width: ORB_SIZE,
        height: ORB_SIZE,
        borderRadius: "50%",
        clipPath: "circle(50%)",
        transformOrigin: "50% 50%",
        boxShadow: "none",
        filter: "none",
        isolation: "isolate",
        background: ORB_BASE,
      }}
    >
      <div
        ref={blurHostRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          borderRadius: "50%",
          filter: `blur(${ORB_BLUR_PX}px)`,
          transform: "scale(1.15)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {ALL_BLOBS.map((blob, i) => (
          <span
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="pointer-events-none absolute left-0 top-0 block rounded-full"
            style={{
              width: ORB_SIZE * blob.size,
              height: ORB_SIZE * blob.size,
              opacity: i >= BASE_BLOB_COUNT ? 0 : blob.opacity,
              pointerEvents: "none",
              background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, ${blob.color} 38%, transparent 72%)`,
              transform: `translate(${blob.homeX * ORB_SIZE}px, ${blob.homeY * ORB_SIZE}px)`,
            }}
          />
        ))}
      </div>

      {/*
        One strip mesh: warp=0 lays strips flat as the original mark;
        warp→1 fans them onto the sphere. No second logo layer = no ghost/reflection.
      */}
      <div
        ref={logoHostRef}
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: LOGO_PERSPECTIVE,
          perspectiveOrigin: "50% 50%",
          opacity: initial.opacity,
          zIndex: initial.zIndex,
          pointerEvents: "none",
        }}
      >
        <div
          ref={logoPivotRef}
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            pointerEvents: "none",
            transform: `rotateY(${initial.longitude}rad)`,
          }}
        >
          {/*
            Crisp parked mark: one full CSS-mask layer (same RING_SRC as strips).
            <img> was invisible in parked states; strips alone mush dots at ~1.6px/slice.
          */}
          <div
            ref={flatLogoRef}
            className="pointer-events-none"
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: LOGO_DESIGN_W,
              height: LOGO_DESIGN_H,
              // translateZ keeps the mark on the front plane under preserve-3d.
              transform: "translate(-50%, -50%) translateZ(0.5px)",
              pointerEvents: "none",
              background: "#004C45",
              WebkitMaskImage: `url(${RING_SRC})`,
              maskImage: `url(${RING_SRC})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: `${LOGO_DESIGN_W}px ${LOGO_DESIGN_H}px`,
              maskSize: `${LOGO_DESIGN_W}px ${LOGO_DESIGN_H}px`,
              WebkitMaskPosition: "0 0",
              maskPosition: "0 0",
              zIndex: 1,
              opacity: initial.warp < 0.02 ? 1 : 0,
              visibility: initial.warp < 0.02 ? "visible" : "hidden",
            }}
          />
          <div
            ref={stripsHostRef}
            className="pointer-events-none"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              transformStyle: "preserve-3d",
              pointerEvents: "none",
              opacity: initial.warp < 0.02 ? 0 : 1,
              visibility: initial.warp < 0.02 ? "hidden" : "visible",
            }}
          >
            {strips.map((strip) => (
              <div
                key={strip.i}
                ref={(el) => {
                  stripRefs.current[strip.i] = el;
                }}
                className="pointer-events-none"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: FLAT_STRIP_W,
                  height: LOGO_DESIGN_H,
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: "none",
                  transform: `translateX(${(-LOGO_DESIGN_W / 2 + (strip.i + 0.5) * FLAT_STRIP_W).toFixed(2)}px) translate(-50%, -50%)`,
                }}
              >
                <div
                  ref={(el) => {
                    sliceRefs.current[strip.i] = el;
                  }}
                  className="pointer-events-none"
                  style={{
                    width: LOGO_DESIGN_W,
                    height: LOGO_DESIGN_H,
                    marginLeft: -strip.i * FLAT_SLICE_W,
                    background: "#004C45",
                    pointerEvents: "none",
                    WebkitMaskImage: `url(${RING_SRC})`,
                    maskImage: `url(${RING_SRC})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: `${LOGO_DESIGN_W}px ${LOGO_DESIGN_H}px`,
                    maskSize: `${LOGO_DESIGN_W}px ${LOGO_DESIGN_H}px`,
                    WebkitMaskPosition: "0 0",
                    maskPosition: "0 0",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
