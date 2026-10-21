"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { TruAIState } from "./types";
import {
  BLOBS,
  ORB_BASE,
  ORB_BLUR_PX,
  ORB_SIZE,
  createOrbFrameState,
  randomLayerOffsets,
  retargetOrb,
  stepOrb,
} from "./orbMotion";

/** Figma Icon/Blue-700 — static, never animates. Prefix matches GitHub Pages basePath. */
const RING_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/figma/truai-bubble-orb-ring.svg`;

type TruAIOrbProps = {
  state: TruAIState;
  reducedMotion?: boolean;
  className?: string;
};

export function TruAIOrb({ state, reducedMotion = false, className }: TruAIOrbProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const frameRef = useRef(createOrbFrameState(state));
  const offsetsRef = useRef(randomLayerOffsets());
  const stateRef = useRef(state);
  const reducedRef = useRef(reducedMotion);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const animatingRef = useRef(false);

  useEffect(() => {
    reducedRef.current = reducedMotion;
    if (reducedMotion) {
      frameRef.current.atRest = true;
      frameRef.current.speed = 0;
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
    const root = rootRef.current;
    if (!root) return;

    function setWillChange(on: boolean) {
      if (animatingRef.current === on) return;
      animatingRef.current = on;
      for (const el of layerRefs.current) {
        if (el) el.style.willChange = on ? "transform" : "auto";
      }
    }

    function apply(layers: { transform: string }[]) {
      layers.forEach((t, i) => {
        const el = layerRefs.current[i];
        if (el) el.style.transform = t.transform;
      });
      if (root) {
        root.style.transform = `scale(${frameRef.current.orbScale})`;
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
        Math.abs(frame.speed - frame.targetSpeed) > 0.001 ||
        Math.abs(frame.amplitude - frame.targetAmplitude) > 0.001;

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
      setWillChange(!reduced && (frame.speed > 0.001 || !!frame.pop || !!frame.speedTween));
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
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn("relative shrink-0", className)}
      style={{
        width: ORB_SIZE,
        height: ORB_SIZE,
        borderRadius: "50%",
        overflow: "hidden",
        transformOrigin: "50% 50%",
        boxShadow: "none",
        filter: "none",
        isolation: "isolate",
        background: ORB_BASE,
      }}
    >
      {/* Static blur host — only blob transforms animate */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: "50%",
          filter: `blur(${ORB_BLUR_PX}px)`,
          transform: "scale(1.15)",
        }}
      >
        {BLOBS.map((blob, i) => (
          <span
            key={i}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 block rounded-full"
            style={{
              width: ORB_SIZE * blob.size,
              height: ORB_SIZE * blob.size,
              opacity: blob.opacity,
              background: `radial-gradient(circle at 50% 50%, ${blob.color} 0%, ${blob.color} 35%, transparent 70%)`,
              transform: `translate(${blob.homeX * ORB_SIZE}px, ${blob.homeY * ORB_SIZE}px)`,
            }}
          />
        ))}
      </div>

      {/* Dotted ring — static, on top */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "25%",
          bottom: "25.66%",
          left: "19.53%",
          right: "20.33%",
          background: "#004C45",
          WebkitMaskImage: `url(${RING_SRC})`,
          maskImage: `url(${RING_SRC})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      />
    </div>
  );
}
