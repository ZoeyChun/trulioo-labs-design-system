"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, EASE_CSS } from "./easings";
import { ORB_OVERLAP } from "./orbMotion";
import { TruAIOrb } from "./TruAIOrb";
import type { TruAIBubbleProps, TruAIState } from "./types";

const DEFAULT_HOLD_MS = 1500;
/** Softer than a hard snap — still within the brief’s “~280ms” spirit. */
const RESIZE_S = 0.4;
const SUB_IN_S = 0.32;
const SUB_OUT_S = 0.22;
const SUB_IN_DELAY_S = 0.04;
/** Longer overlap so subtext↔subtext reads as one continuous crossfade. */
const SUB_SWAP_IN_S = 0.4;
const SUB_SWAP_OUT_S = 0.34;
const GROW_CONTENT_AT = 0.55;
const SUB_LINE_H = 18;
const DOT_ENTER_MS = 240;
const DOT_PULSE_S = 2.2;
const AMBER = "#b07a1a";

type SubContent = {
  key: string;
  label: string;
  icon: ReactNode | null;
  showDot: boolean;
  /** Soft opacity blink — used for thinking loading state. */
  blink?: boolean;
};

function wordCount(label: string) {
  return label.trim().split(/\s+/).filter(Boolean).length;
}

function subForState(
  state: TruAIState,
  actingLabel?: string,
  actingIcon?: ReactNode,
): SubContent | null {
  switch (state) {
    case "idle":
      return null;
    case "thinking":
      return {
        key: "thinking",
        label: "Thinking...",
        icon: null,
        showDot: false,
        blink: true,
      };
    case "acting":
      return {
        key: `acting:${actingLabel?.trim() ?? ""}`,
        label: actingLabel?.trim() || "",
        icon: actingIcon ?? null,
        showDot: false,
      };
    case "completed":
      return { key: "completed", label: "Completed", icon: null, showDot: false };
    case "needs-attention":
      return {
        key: "needs-attention",
        label: "Review findings",
        icon: null,
        showDot: true,
      };
    default:
      return null;
  }
}

export function TruAIBubble({
  state,
  actingLabel,
  actingIcon,
  completedHoldMs = DEFAULT_HOLD_MS,
  onCompletedEnd,
  className,
}: TruAIBubbleProps) {
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (state !== "acting" || !actingLabel) return;
    if (wordCount(actingLabel) > 2) {
      console.warn(
        `[TruAIBubble] actingLabel should be at most 2 words (got "${actingLabel}").`,
      );
    }
  }, [state, actingLabel]);

  const [settledIdle, setSettledIdle] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompletedEndRef = useRef(onCompletedEnd);
  onCompletedEndRef.current = onCompletedEnd;

  useEffect(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (state !== "completed") {
      setSettledIdle(false);
      return;
    }
    setSettledIdle(false);
    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null;
      setSettledIdle(true);
      onCompletedEndRef.current?.();
    }, completedHoldMs);
    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };
  }, [state, completedHoldMs]);

  const visualState: TruAIState =
    state === "completed" && settledIdle ? "idle" : state;

  const targetSub = subForState(visualState, actingLabel, actingIcon);

  const [shown, setShown] = useState<SubContent | null>(() =>
    subForState(state, actingLabel, actingIcon),
  );
  const [pillSize, setPillSize] = useState({ w: 0, h: 0 });
  const [sizeReady, setSizeReady] = useState(false);
  /** True while crossfading between two subtext states (no empty gap). */
  const [isSwap, setIsSwap] = useState(false);
  /** Keep the subtext row height while the last line finishes fading out. */
  const [holdSlot, setHoldSlot] = useState(false);

  const measureRef = useRef<HTMLDivElement>(null);
  const shownRef = useRef(shown);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const genRef = useRef(0);
  shownRef.current = shown;

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  }, []);

  const measure = useCallback((sub: SubContent | null) => {
    const el = measureRef.current;
    if (!el) return { w: 0, h: 0 };
    const key = sub ? sub.key : "idle";
    const slots = Array.from(el.querySelectorAll<HTMLElement>("[data-measure]"));
    const slot =
      slots.find((node) => node.dataset.measure === key) ??
      slots.find((node) => node.dataset.measure === "idle");
    if (!slot) return { w: 0, h: 0 };
    return { w: slot.offsetWidth, h: slot.offsetHeight };
  }, []);

  useLayoutEffect(() => {
    const size = measure(shown);
    if (size.w > 0) {
      setPillSize(size);
      setSizeReady(true);
    }
  }, [measure, shown]);

  const runTransition = useCallback(
    (next: SubContent | null) => {
      clearTimers();
      const gen = ++genRef.current;
      const still = () => gen === genRef.current;
      const after = (ms: number, fn: () => void) => {
        const id = setTimeout(() => {
          if (still()) fn();
        }, ms);
        timersRef.current.push(id);
      };

      const prev = shownRef.current;
      const same =
        (!prev && !next) ||
        (!!prev && !!next && prev.key === next.key && prev.label === next.label);

      if (same) {
        const size = measure(next);
        if (size.w > 0) setPillSize(size);
        return;
      }

      if (reduceMotion) {
        setIsSwap(false);
        setHoldSlot(false);
        setShown(next);
        const size = measure(next);
        if (size.w > 0) setPillSize(size);
        return;
      }

      const prevHas = !!prev;
      const nextHas = !!next;
      const growing = !prevHas && nextHas;
      const shrinking = prevHas && !nextHas;
      const swapping = prevHas && nextHas;

      if (growing) {
        setIsSwap(false);
        setHoldSlot(false);
        // Resize first; reveal subtext once the pill is ~55% open
        const size = measure(next);
        if (size.w > 0) setPillSize(size);
        after(RESIZE_S * GROW_CONTENT_AT * 1000, () => setShown(next));
        return;
      }

      if (shrinking) {
        setIsSwap(false);
        setHoldSlot(true);
        // Fade out first, then shrink
        setShown(null);
        after(SUB_OUT_S * 1000, () => {
          setHoldSlot(false);
          const size = measure(null);
          if (size.w > 0) setPillSize(size);
        });
        return;
      }

      if (swapping) {
        // Paint isSwap=true while old label is still mounted so exit uses swap
        // timings, then swap content on the next frame for a true crossfade.
        setHoldSlot(false);
        setIsSwap(true);
        after(20, () => {
          const size = measure(next);
          if (size.w > 0) setPillSize(size);
          setShown(next);
          after(Math.max(SUB_SWAP_IN_S, SUB_SWAP_OUT_S) * 1000 + 40, () => {
            setIsSwap(false);
          });
        });
        return;
      }

      setIsSwap(false);
      setHoldSlot(false);
      setShown(next);
      const size = measure(next);
      if (size.w > 0) setPillSize(size);
    },
    [clearTimers, measure, reduceMotion],
  );

  const targetKey = targetSub?.key ?? "idle";
  const targetLabel = targetSub?.label ?? "";
  useEffect(() => {
    runTransition(targetSub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualState, targetKey, targetLabel, actingIcon, runTransition]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const actingMeasureKey =
    targetSub?.key.startsWith("acting:") || shown?.key.startsWith("acting:")
      ? targetSub?.key.startsWith("acting:")
        ? targetSub.key
        : shown!.key
      : actingLabel
        ? `acting:${actingLabel.trim()}`
        : null;

  const sizeTransition = reduceMotion
    ? { duration: 0.12, ease: EASE_CSS.outSoft }
    : { duration: RESIZE_S, ease: EASE_CSS.outSoft };

  return (
    <div
      className={cn("relative isolate flex flex-col items-center", className)}
      data-state={visualState}
    >
      <style>{DOT_CSS}</style>

      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10"
        style={{ visibility: "hidden", position: "absolute" }}
      >
        <MeasureSlot dataMeasure="idle" />
        <MeasureSlot dataMeasure="thinking" sub={<SubInner label="Thinking..." />} />
        <MeasureSlot dataMeasure="completed" sub={<SubInner label="Completed" />} />
        <MeasureSlot
          dataMeasure="needs-attention"
          sub={<SubInner label="Review findings" showDot />}
        />
        {actingMeasureKey ? (
          <MeasureSlot
            dataMeasure={actingMeasureKey}
            sub={
              <SubInner
                label={
                  (targetSub?.key === actingMeasureKey
                    ? targetSub.label
                    : shown?.key === actingMeasureKey
                      ? shown.label
                      : actingLabel?.trim()) || ""
                }
                icon={
                  targetSub?.key === actingMeasureKey
                    ? targetSub.icon
                    : shown?.key === actingMeasureKey
                      ? shown.icon
                      : actingIcon
                }
              />
            }
          />
        ) : null}
      </div>

      <div
        className="relative z-[2]"
        style={{
          marginBottom: ORB_OVERLAP,
          // Orb itself has no drop shadow in Figma (effect visible: false)
          boxShadow: "none",
          filter: "none",
        }}
      >
        <TruAIOrb state={visualState} reducedMotion={reduceMotion} />
      </div>

      <motion.div
        className="relative z-[1] overflow-hidden bg-white"
        initial={false}
        animate={
          sizeReady
            ? { width: pillSize.w, height: pillSize.h }
            : undefined
        }
        transition={sizeTransition}
        style={{
          // Frame 628 / 1448:74981
          contain: "layout",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: 16, // --tru-radius-2xl
          // Figma 1448:75070 DROP_SHADOW (6/-2 @ 10%, 16/-4 @ 16%) — opacities
          // eased for CSS; zero-offset ambient shadows read heavier in browsers.
          boxShadow:
            "0px 0px 6px -2px rgba(0,0,0,0.06), 0px 0px 16px -4px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          width: sizeReady ? undefined : "max-content",
          height: sizeReady ? undefined : "auto",
        }}
      >
        <div className="flex shrink-0 items-center">
          <p
            className="whitespace-nowrap font-medium not-italic"
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: 16,
              lineHeight: "22px",
              color: "#172d2d",
            }}
          >
            TruAI
          </p>
        </div>

        <div
          className="relative w-full shrink-0"
          style={{
            height: shown || isSwap || holdSlot ? SUB_LINE_H : 0,
            transition: reduceMotion
              ? undefined
              : `height ${RESIZE_S}s ${EASE.outSoft}`,
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence initial={false}>
            {shown ? (
              <motion.div
                key={shown.key}
                className="absolute inset-x-0 top-0 flex items-center justify-center gap-1"
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : isSwap
                      ? { opacity: 0, y: 1 }
                      : { opacity: 0, y: 3 }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0 }
                }
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration: 0.12 } }
                    : {
                        opacity: 0,
                        y: isSwap ? -1 : -2,
                        transition: {
                          duration: isSwap ? SUB_SWAP_OUT_S : SUB_OUT_S,
                          ease: EASE_CSS.outSoft,
                        },
                      }
                }
                transition={{
                  duration: isSwap ? SUB_SWAP_IN_S : SUB_IN_S,
                  delay: reduceMotion || isSwap ? 0 : SUB_IN_DELAY_S,
                  ease: EASE_CSS.outSoft,
                }}
              >
                <SubInner
                  label={shown.label}
                  icon={shown.icon}
                  showDot={shown.showDot}
                  animateDot={!reduceMotion}
                  blink={!!shown.blink && !reduceMotion}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

const DOT_CSS = `
@keyframes truai-dot-enter {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes truai-dot-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
@keyframes truai-sub-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
}
`;

/** Slow, subtle thinking pulse. */
const SUB_BLINK_S = 2.8;

function MeasureSlot({
  dataMeasure,
  sub,
}: {
  dataMeasure: string;
  sub?: ReactNode;
}) {
  return (
    <div
      data-measure={dataMeasure}
      className="flex flex-col items-center justify-center bg-white"
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 16,
        width: "max-content",
        boxSizing: "border-box",
      }}
    >
      <div className="flex items-center">
        <p
          className="whitespace-nowrap font-medium"
          style={{
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: 16,
            lineHeight: "22px",
          }}
        >
          TruAI
        </p>
      </div>
      {sub ? <div className="flex items-center gap-1">{sub}</div> : null}
    </div>
  );
}

function SubInner({
  label,
  icon,
  showDot,
  animateDot,
  blink,
}: {
  label: string;
  icon?: ReactNode | null;
  showDot?: boolean;
  animateDot?: boolean;
  blink?: boolean;
}) {
  return (
    <>
      {showDot ? (
        <span className="inline-flex size-3 shrink-0 items-center justify-center" aria-hidden>
          <span
            className="block rounded-full"
            style={{
              width: 6,
              height: 6,
              background: AMBER,
              transformOrigin: "center",
              animation: animateDot
                ? `truai-dot-enter ${DOT_ENTER_MS}ms ${EASE.outSoft} both, truai-dot-pulse ${DOT_PULSE_S}s ${EASE.loop} ${DOT_ENTER_MS}ms infinite`
                : undefined,
            }}
          />
        </span>
      ) : null}
      {icon ? (
        <span
          className="inline-flex size-3 shrink-0 items-center justify-center text-[#617269] [&_svg]:size-3"
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      {label ? (
        <p
          className="whitespace-nowrap font-normal not-italic"
          style={{
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: 12,
            lineHeight: "18px",
            color: "#526660",
            animation: blink
              ? `truai-sub-blink ${SUB_BLINK_S}s ${EASE.loop} infinite`
              : undefined,
          }}
        >
          {label}
        </p>
      ) : null}
    </>
  );
}

export type { TruAIBubbleProps, TruAIState };
