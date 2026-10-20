"use client";

import { useCallback, useState } from "react";
import { FileText, Search } from "lucide-react";
import { TruAIBubble, type TruAIState } from "@/components/TruAIBubble";
import { cn } from "@/lib/utils";

const STATES: { id: TruAIState; label: string }[] = [
  { id: "idle", label: "Idle" },
  { id: "thinking", label: "Thinking" },
  { id: "acting", label: "Acting" },
  { id: "completed", label: "Completed" },
  { id: "needs-attention", label: "Needs attention" },
];

export function TruAIBubbleDemo() {
  const [state, setState] = useState<TruAIState>("idle");
  const [actingMode, setActingMode] = useState<"search" | "report">("search");

  const onCompletedEnd = useCallback(() => {
    setState("idle");
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F6F4] px-6 py-16 text-[#172d2d]">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header>
          <p className="text-[12px] tracking-[0.08em] text-[#8a9a90] uppercase">
            Portal 2.0 · Loader
          </p>
          <h1 className="mt-2 text-2xl font-medium">TruAI collapsed bubble</h1>
          <p className="mt-2 max-w-xl text-[14px] leading-6 text-[#526660]">
            React component with layered mesh-orb motion. Switch states below —
            completed returns to idle after the hold.
          </p>
        </header>

        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-[#dde2de] bg-white px-8 py-16">
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
        </div>

        <div className="flex flex-wrap gap-2">
          {STATES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setState(item.id)}
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-2 text-[13px] transition-colors",
                state === item.id
                  ? "border-[#172d2d] bg-[#172d2d] text-white"
                  : "border-[#dde2de] bg-white text-[#172d2d] hover:bg-[#f0f3f1]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {state === "acting" ? (
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
