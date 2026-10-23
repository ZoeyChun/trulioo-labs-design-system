"use client";

import { useCallback, useEffect, useState } from "react";
import { FileText, Search } from "lucide-react";
import { TruAIBubble, type TruAIState } from "@/components/TruAIBubble";
import { TruAIOrb } from "@/components/TruAIBubble/TruAIOrb";
import { LOGO_ORBIT_PERIOD_S } from "@/components/TruAIBubble/orbMotion";
import { cn } from "@/lib/utils";

type DemoMode = TruAIState | "home";

/** Home (orb-only) first, then status states. */
const MODES: { id: DemoMode; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "idle", label: "Idle" },
  { id: "thinking", label: "Thinking" },
  { id: "acting", label: "Acting" },
  { id: "completed", label: "Completed" },
  { id: "needs-attention", label: "Needs attention" },
];

/** Matches thinking logoSpin in orbMotion (1.35× base period). */
const THINKING_ORBIT_RATE = 1.35;
/** One full Thinking orbit before settling into the Home landing mesh. */
const HOME_INTRO_MS = (LOGO_ORBIT_PERIOD_S / THINKING_ORBIT_RATE) * 1000;

export function TruAIBubbleDemo() {
  const [mode, setMode] = useState<DemoMode>("home");
  const [actingMode, setActingMode] = useState<"search" | "report">("search");
  const [homeHover, setHomeHover] = useState(false);
  const [homeIntro, setHomeIntro] = useState(true);

  const onCompletedEnd = useCallback(() => {
    setMode("idle");
  }, []);

  useEffect(() => {
    if (mode !== "home") {
      setHomeIntro(false);
      setHomeHover(false);
      return;
    }
    setHomeIntro(true);
    setHomeHover(false);
    const timer = window.setTimeout(() => setHomeIntro(false), HOME_INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [mode]);

  const isHome = mode === "home";
  const homeThinking = isHome && (homeIntro || homeHover);
  const state: TruAIState = isHome ? "idle" : mode;

  return (
    <main className="min-h-screen bg-[#F4F6F4] px-6 py-16 text-[#172d2d]">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header>
          <p className="text-[12px] tracking-[0.08em] text-[#8a9a90] uppercase">
            Portal 2.0 · Loader
          </p>
          <h1 className="mt-2 text-2xl font-medium">TruAI collapsed bubble</h1>
          <p className="mt-2 max-w-xl text-[14px] leading-6 text-[#526660]">
            On Thinking the logo wraps around the sphere surface — foreshortens
            with the curvature, disappears behind, then reappears on the other
            side. Completed returns to idle after the hold. Home previews the
            landing affordance: orb only (original colors, no size pulse).
          </p>
        </header>

        <div className="relative isolate flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-[#dde2de] bg-white px-8 py-16">
          {isHome ? (
            <button
              type="button"
              aria-label="Open TruAI chat"
              className="cursor-pointer rounded-full border-0 bg-transparent p-0"
              onMouseEnter={() => setHomeHover(true)}
              onMouseLeave={() => setHomeHover(false)}
              onFocus={() => setHomeHover(true)}
              onBlur={() => setHomeHover(false)}
            >
              {/* Enter: one Thinking orbit → landing mesh. Hover: Thinking again. */}
              <TruAIOrb
                state={homeThinking ? "thinking" : "idle"}
                landing={!homeThinking}
              />
            </button>
          ) : (
            <TruAIBubble
              state={state}
              actingLabel={actingMode === "search" ? "Checking registry" : "Generating report"}
              actingIcon={
                actingMode === "search" ? (
                  <Search size={12} strokeWidth={2} />
                ) : (
                  <FileText size={12} strokeWidth={2} />
                )
              }
              completedHoldMs={1500}
              onCompletedEnd={onCompletedEnd}
            />
          )}
        </div>

        <div className="relative z-10 flex flex-wrap gap-2">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={cn(
                "relative z-10 cursor-pointer rounded-lg border px-3 py-2 text-[13px] transition-colors",
                mode === item.id
                  ? "border-[#172d2d] bg-[#172d2d] text-white"
                  : "border-[#dde2de] bg-white text-[#172d2d] hover:bg-[#f0f3f1]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {mode === "acting" ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActingMode("search")}
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-2 text-[13px]",
                actingMode === "search"
                  ? "border-[#172d2d] bg-[#172d2d] text-white"
                  : "border-[#dde2de] bg-white",
              )}
            >
              Search · Checking registry
            </button>
            <button
              type="button"
              onClick={() => setActingMode("report")}
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-2 text-[13px]",
                actingMode === "report"
                  ? "border-[#172d2d] bg-[#172d2d] text-white"
                  : "border-[#dde2de] bg-white",
              )}
            >
              Doc · Generating report
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
