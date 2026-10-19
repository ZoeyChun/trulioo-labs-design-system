"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUp, Mic, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = ["Where can I start?", "Verify business", "Verify person"] as const;

export function TruAiDrawer({
  displayClassName,
  orb,
  micOn,
  micError,
  onToggleMic,
}: {
  displayClassName: string;
  orb: ReactNode;
  micOn: boolean;
  micError: string | null;
  onToggleMic: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const canSend = prompt.trim().length > 0;

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function chooseSuggestion(value: string) {
    setPrompt(value);
    inputRef.current?.focus();
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.aside
            role="dialog"
            aria-labelledby={titleId}
            initial={reduceMotion ? false : { x: 28 }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: 28, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-3 right-3 bottom-3 flex w-[478px] max-w-[calc(100%-1.5rem)] flex-col overflow-y-auto rounded-xl bg-white text-[#172d2d]"
          >
            <div className="flex min-h-full flex-col px-[17px] pt-[33px] pb-[33px]">
              <header className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <h1 id={titleId} className="text-[20px] leading-7 font-semibold">
                    Welcome, Zoey.
                  </h1>
                  <p className="text-sm leading-[22px] text-[#8a9a90]">September 30, 2026</p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md border border-[#dde2de] bg-white text-[#617269]"
                >
                  <X size={16} strokeWidth={1.75} />
                </button>
              </header>

              <div className="mt-12 flex flex-1 flex-col items-center justify-center gap-4">
                <div className="grid min-h-24 place-items-center">{orb}</div>
                <p className={cn(displayClassName, "text-center text-[36px] leading-[44px]")}>Ask TruAI</p>
              </div>

              <ul className="pt-8 pb-10">
                {SUGGESTIONS.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => chooseSuggestion(suggestion)}
                      className="flex w-full cursor-pointer items-center border-b border-[#dde2de] py-3 text-left"
                    >
                      <span className="min-w-0 flex-1 text-sm leading-[22px]">{suggestion}</span>
                      <span className="grid size-7 shrink-0 place-items-center text-[#617269]" aria-hidden>
                        <ArrowRight size={16} strokeWidth={1.75} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <form
                className="flex h-[120px] shrink-0 flex-col gap-2 rounded-2xl border border-[#dde2de] bg-white p-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!canSend) return;
                  setPrompt("");
                }}
              >
                <textarea
                  ref={inputRef}
                  value={prompt}
                  rows={2}
                  onChange={(event) => setPrompt(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      if (!canSend) return;
                      setPrompt("");
                    }
                  }}
                  placeholder="Ask questions or tell me what you’d like to do"
                  className="min-h-0 w-full flex-1 resize-none bg-transparent text-sm leading-[18px] text-[#172d2d] placeholder:text-[#8a9a90] focus:outline-none"
                />
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    aria-label="Add attachment"
                    hidden
                    onClick={() => fileRef.current?.click()}
                    className="grid size-7 cursor-pointer place-items-center rounded-full text-[#617269]"
                  >
                    <Plus size={16} strokeWidth={1.75} />
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      event.target.value = "";
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={micOn ? "Turn microphone off" : "Turn microphone on"}
                      aria-pressed={micOn}
                      onClick={onToggleMic}
                      className={cn(
                        "grid size-7 cursor-pointer place-items-center rounded-full",
                        micOn ? "bg-[#005A50] text-white" : "text-[#617269]",
                      )}
                    >
                      <Mic size={16} strokeWidth={1.75} />
                    </button>
                    <button
                      type="submit"
                      aria-label="Send"
                      disabled={!canSend}
                      className="grid size-7 place-items-center rounded-full bg-[#e8ede8] text-[#617269] disabled:cursor-default"
                    >
                      <ArrowUp size={16} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </form>
              {micError ? <p className="mt-2 text-xs leading-[18px] text-[#b42832]">{micError}</p> : null}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute top-3 right-3 cursor-pointer rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#172d2d]"
        >
          Ask TruAI
        </button>
      )}
    </>
  );
}
