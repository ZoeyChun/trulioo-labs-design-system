"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { ModeOpts, OrbState } from "thinking-orbs";
import { AiOrb } from "./ai-orb";
import { LogoBreath } from "./logo-breath";
import { LogoMark, type LogoMotion } from "./logo-mark";
import { cn } from "@/lib/utils";

const STATES: { state: OrbState; label: string; detail: string; sample: string }[] = [
  { state: "working", label: "Working", detail: "Particles on tilted orbits", sample: "Working through the queue" },
  { state: "searching", label: "Searching", detail: "A scan sweeps a dotted globe", sample: "Searching yesterday's verifications" },
  { state: "solving", label: "Solving", detail: "Bands scramble, then click back", sample: "Solving the registry mismatch" },
  { state: "listening", label: "Listening", detail: "A waveform rolls through the rings", sample: "Listening for the next prompt" },
  { state: "connecting", label: "Connecting", detail: "A constellation wires itself", sample: "Connecting related entities" },
  { state: "weaving", label: "Weaving", detail: "Three strands plait the sphere", sample: "Weaving the case together" },
  { state: "composing", label: "Composing", detail: "An undulating multi-band sash", sample: "Composing the answer" },
  { state: "breathing", label: "Breathing", detail: "A face-on ring slowly morphs", sample: "Thinking it through" },
  { state: "shaping", label: "Shaping", detail: "Circle, triangle, then square", sample: "Shaping the response" },
];

const SPEEDS = [0.5, 1, 2] as const;

const INKS = [
  { label: "TruAI", value: "#8F2CF3" },
  { label: "Teal", value: "#008080" },
  { label: "Green", value: "#005A50" },
  { label: "Ink", value: "" },
] as const;

type Knob = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  fallback: number;
};

const KNOBS: Partial<Record<OrbState, Knob[]>> = {
  working: [
    { key: "particles", label: "Particles", min: 1, max: 8, step: 1, fallback: 3 },
    { key: "ghostA", label: "Trail", min: 0, max: 1, step: 0.05, fallback: 0.5 },
  ],
  searching: [
    { key: "dimBase", label: "Unscanned", min: 0.1, max: 1, step: 0.05, fallback: 0.45 },
    { key: "scanMul", label: "Sweep", min: 1, max: 8, step: 0.1, fallback: 4 },
  ],
  solving: [{ key: "moveCount", label: "Moves", min: 4, max: 28, step: 1, fallback: 14 }],
  connecting: [
    { key: "signals", label: "Packets", min: 1, max: 12, step: 1, fallback: 5 },
    { key: "lineW", label: "Lines", min: 0.4, max: 2.2, step: 0.1, fallback: 0.8 },
  ],
  weaving: [{ key: "turns", label: "Turns", min: 1, max: 6, step: 1, fallback: 3 }],
  composing: [
    { key: "wobMul", label: "Wobble", min: 0, max: 2, step: 0.05, fallback: 1 },
    { key: "bandMul", label: "Bands", min: 1, max: 6, step: 0.1, fallback: 3.9 },
  ],
  breathing: [
    { key: "wobMul", label: "Wobble", min: 0, max: 1.5, step: 0.05, fallback: 0.4 },
    { key: "bandMul", label: "Bands", min: 1, max: 6, step: 0.1, fallback: 3.6 },
  ],
  shaping: [{ key: "spread", label: "Spread", min: 0.8, max: 1.8, step: 0.05, fallback: 1.45 }],
};

const SHAPES = [
  { id: "cycle", label: "Cycle" },
  { id: "0", label: "Circle" },
  { id: "1", label: "Triangle" },
  { id: "2", label: "Square" },
] as const;

const LOGO_MOTIONS: { id: LogoMotion; label: string }[] = [
  { id: "form", label: "Form" },
  { id: "orbit", label: "Orbit" },
  { id: "pulse", label: "Pulse" },
  { id: "bloom", label: "Bloom" },
];

type ShapeHold = "cycle" | 0 | 1 | 2;

const DEFAULT_INK = "#8F2CF3";

export function OrbShowcase() {
  const [dark, setDark] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [ink, setInk] = useState(DEFAULT_INK);
  const [dots, setDots] = useState(1);
  const [dotSize, setDotSize] = useState(1);
  const [shape, setShape] = useState<ShapeHold>("cycle");
  const [logoMotion, setLogoMotion] = useState<LogoMotion>("form");
  const [overrides, setOverrides] = useState<Partial<Record<OrbState, ModeOpts>>>({});

  function setKnob(state: OrbState, key: string, value: number) {
    setOverrides((current) => ({
      ...current,
      [state]: { ...current[state], [key]: value },
    }));
  }

  function optsFor(state: OrbState): ModeOpts | undefined {
    const opts: ModeOpts = { ...overrides[state] };
    if (state === "shaping" && shape !== "cycle") opts.shape = shape;
    return Object.keys(opts).length > 0 ? opts : undefined;
  }

  function resetDesign() {
    setInk(DEFAULT_INK);
    setDots(1);
    setDotSize(1);
    setShape("cycle");
    setLogoMotion("form");
    setOverrides({});
  }

  return (
    <div className={cn("h-dvh overflow-y-auto", dark ? "bg-[#121816] text-[#f4f6f4]" : "bg-[#e8ede8] text-[#172d2d]")}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className={cn("text-xs font-medium", dark ? "text-[#9aada6] hover:text-white" : "text-[#617269] hover:text-[#004c45]")}
            >
              Portal
            </Link>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Thinking orbs</h1>
            <p className={cn("mt-1 max-w-xl text-sm leading-[22px]", dark ? "text-[#9aada6]" : "text-[#617269]")}>
              Nine hand-tuned states, plus the Trulioo mark. 64px is the chat avatar. 20px sits in a line of text.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={cn("flex rounded-full p-1", dark ? "bg-[#1c2824]" : "bg-white")}
              role="group"
              aria-label="Theme"
            >
              <Toggle active={!dark} dark={dark} onClick={() => setDark(false)}>
                Light
              </Toggle>
              <Toggle active={dark} dark={dark} onClick={() => setDark(true)}>
                Dark
              </Toggle>
            </div>
            <div
              className={cn("flex rounded-full p-1", dark ? "bg-[#1c2824]" : "bg-white")}
              role="group"
              aria-label="Speed"
            >
              {SPEEDS.map((value) => (
                <Toggle key={value} active={speed === value} dark={dark} onClick={() => setSpeed(value)}>
                  {value}×
                </Toggle>
              ))}
            </div>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium",
                paused
                  ? "bg-[#8F2CF3] text-white"
                  : dark
                    ? "bg-[#1c2824] text-[#f4f6f4]"
                    : "bg-white text-[#172d2d]",
              )}
            >
              {paused ? "Paused" : "Pause"}
            </button>
          </div>
        </header>

        <section
          aria-label="Design"
          className={cn(
            "rounded-2xl border p-5",
            dark ? "border-white/10 bg-[#1c2824]" : "border-[#dde2de] bg-white",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Design</h2>
            <button
              type="button"
              onClick={resetDesign}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1 text-sm font-medium",
                dark ? "text-[#9aada6] hover:text-white" : "text-[#617269] hover:text-[#172d2d]",
              )}
            >
              Reset
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end">
            <div>
              <p className={cn("text-xs", dark ? "text-[#9aada6]" : "text-[#617269]")}>Color</p>
              <div className="mt-2 flex items-center gap-2" role="group" aria-label="Color">
                {INKS.map((swatch) => (
                  <button
                    key={swatch.label}
                    type="button"
                    aria-label={swatch.label}
                    aria-pressed={ink === swatch.value}
                    onClick={() => setInk(swatch.value)}
                    className={cn(
                      "size-7 cursor-pointer rounded-full border",
                      ink === swatch.value ? "ring-2 ring-[#8F2CF3] ring-offset-2" : "border-transparent",
                      dark ? "ring-offset-[#1c2824]" : "ring-offset-white",
                      !swatch.value && "border-white/20 bg-[linear-gradient(135deg,#172d2d_50%,#f4f6f4_50%)]",
                    )}
                    style={swatch.value ? { backgroundColor: swatch.value } : undefined}
                  />
                ))}
                <label className="relative size-7 cursor-pointer">
                  <span className="sr-only">Custom color</span>
                  <input
                    type="color"
                    value={ink || DEFAULT_INK}
                    onChange={(event) => setInk(event.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "block size-7 rounded-full border-2",
                      ink && !INKS.some((swatch) => swatch.value === ink)
                        ? "border-[#8F2CF3]"
                        : dark
                          ? "border-white/20"
                          : "border-[#dde2de]",
                    )}
                    style={{ background: "conic-gradient(#8F2CF3, #008080, #005A50, #f4f6f4, #8F2CF3)" }}
                  />
                </label>
              </div>
            </div>
            <Slider
              label="Density"
              min={0.4}
              max={2}
              step={0.1}
              value={dots}
              dark={dark}
              onChange={setDots}
            />
            <Slider
              label="Dot size"
              min={0.5}
              max={2}
              step={0.1}
              value={dotSize}
              dark={dark}
              onChange={setDotSize}
            />
          </div>
        </section>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li
            className={cn(
              "flex flex-col gap-4 rounded-2xl border p-5",
              dark ? "border-white/10 bg-[#1c2824]" : "border-[#dde2de] bg-white",
            )}
          >
            <div className="flex justify-center py-2">
              <LogoMark size={64} motion={logoMotion} speed={speed} paused={paused} dark={dark} color={ink} dots={dots} dotSize={dotSize} />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Logo</h2>
              <p className={cn("mt-0.5 text-xs leading-[18px]", dark ? "text-[#9aada6]" : "text-[#617269]")}>
                The Trulioo ring, drawn with its own dots.
              </p>
            </div>
            <div className="flex flex-wrap gap-1" role="group" aria-label="Logo motion">
              {LOGO_MOTIONS.map((option) => (
                <Toggle key={option.id} active={logoMotion === option.id} dark={dark} onClick={() => setLogoMotion(option.id)}>
                  {option.label}
                </Toggle>
              ))}
            </div>
            <p
              className={cn(
                "mt-auto flex items-center gap-2 border-t pt-3 text-sm leading-[22px]",
                dark ? "border-white/10 text-[#d5e0db]" : "border-[#dde2de] text-[#526660]",
              )}
            >
              <LogoMark size={20} motion={logoMotion} speed={speed} paused={paused} dark={dark} color={ink} dots={dots} dotSize={dotSize} />
              <span>Trulioo</span>
            </p>
          </li>
          <li
            className={cn(
              "flex flex-col gap-4 rounded-2xl border p-5",
              dark ? "border-white/10 bg-[#1c2824]" : "border-[#dde2de] bg-white",
            )}
          >
            <div className="flex justify-center py-2">
              <LogoBreath size={64} speed={speed} paused={paused} dark={dark} color={ink} dots={dots} dotSize={dotSize} />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Badge</h2>
              <p className={cn("mt-0.5 text-xs leading-[18px]", dark ? "text-[#9aada6]" : "text-[#617269]")}>
                The dotted mark sits in a circle, with the breathing loader around it.
              </p>
            </div>
            <div
              className={cn(
                "mt-auto flex items-center gap-2 border-t pt-3 text-sm leading-[22px]",
                dark ? "border-white/10 text-[#d5e0db]" : "border-[#dde2de] text-[#526660]",
              )}
            >
              <LogoBreath size={20} speed={speed} paused={paused} dark={dark} color={ink} dots={dots} dotSize={dotSize} />
              <span>Trulioo</span>
            </div>
          </li>
          {STATES.map(({ state, label, detail, sample }) => {
            const look = { state, speed, dark, paused, color: ink, dots, dotSize, opts: optsFor(state) };
            const knobs = KNOBS[state] ?? [];
            return (
              <li
                key={state}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border p-5",
                  dark ? "border-white/10 bg-[#1c2824]" : "border-[#dde2de] bg-white",
                )}
              >
                <div className="flex justify-center py-2">
                  <AiOrb size={64} {...look} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">{label}</h2>
                  <p className={cn("mt-0.5 text-xs leading-[18px]", dark ? "text-[#9aada6]" : "text-[#617269]")}>
                    {detail}
                  </p>
                </div>
                {knobs.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {knobs.map((knob) => (
                      <Slider
                        key={knob.key}
                        label={knob.label}
                        min={knob.min}
                        max={knob.max}
                        step={knob.step}
                        value={overrides[state]?.[knob.key] ?? knob.fallback}
                        dark={dark}
                        onChange={(value) => setKnob(state, knob.key, value)}
                      />
                    ))}
                  </div>
                )}
                {state === "shaping" && (
                  <div className="flex flex-wrap gap-1" role="group" aria-label="Shape">
                    {SHAPES.map((option) => (
                      <Toggle
                        key={option.id}
                        active={shape === (option.id === "cycle" ? "cycle" : Number(option.id))}
                        dark={dark}
                        onClick={() => setShape(option.id === "cycle" ? "cycle" : (Number(option.id) as 0 | 1 | 2))}
                      >
                        {option.label}
                      </Toggle>
                    ))}
                  </div>
                )}
                <p
                  className={cn(
                    "mt-auto flex items-center gap-2 border-t pt-3 text-sm leading-[22px]",
                    dark ? "border-white/10 text-[#d5e0db]" : "border-[#dde2de] text-[#526660]",
                  )}
                >
                  <AiOrb size={20} {...look} />
                  <span>{sample}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function formatValue(value: number, step: number) {
  if (step >= 1) return String(Math.round(value));
  if (step >= 0.1) return value.toFixed(1);
  return value.toFixed(2);
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  dark,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  dark: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="flex items-center justify-between gap-3 text-xs">
        <span className={dark ? "text-[#9aada6]" : "text-[#617269]"}>{label}</span>
        <span className="tabular-nums">{formatValue(value, step)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 w-full cursor-pointer accent-[#8F2CF3]"
      />
    </label>
  );
}

function Toggle({
  active,
  dark,
  onClick,
  children,
}: {
  active: boolean;
  dark: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full px-3 py-1 text-sm font-medium",
        active
          ? "bg-[#8F2CF3] text-white"
          : dark
            ? "text-[#9aada6] hover:text-white"
            : "text-[#617269] hover:text-[#172d2d]",
      )}
    >
      {children}
    </button>
  );
}
