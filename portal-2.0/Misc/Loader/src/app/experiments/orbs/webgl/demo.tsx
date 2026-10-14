"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Captions, Mic, MicOff, Settings, Volume2, VolumeX, X } from "lucide-react";
import { AIOrb, DEFAULT_ORB_COLORS, DEFAULT_ORB_DESIGN, primeAudioContext, useAudioLevel, type OrbColors, type OrbDesign, type OrbState } from "@/components/AIOrb";

const STATES: OrbState[] = ["idle", "listening", "thinking", "speaking", "muted"];

const CAPTIONS: Record<OrbState, string> = {
  idle: "Ready when you are",
  listening: "Listening…",
  thinking: "Thinking…",
  speaking: "Here's what I found",
  muted: "Microphone muted",
};

const GRAY_WASH = 0.28;

type LookId = "voice" | "trulioo" | "aurora" | "glacier" | "ember";

type Look = {
  id: LookId;
  label: string;
  colors: OrbColors;
  design: OrbDesign;
};

const LOOKS: Look[] = [
  { id: "voice", label: "Voice", colors: DEFAULT_ORB_COLORS, design: DEFAULT_ORB_DESIGN },
  {
    id: "trulioo",
    label: "Trulioo",
    colors: { deep: "#005A50", mid: "#3CB8A8", light: "#E9F8F4" },
    design: { ...DEFAULT_ORB_DESIGN, warp: 0.58, verticalBias: 0.72, glow: 0.14 },
  },
  {
    id: "aurora",
    label: "Aurora",
    colors: { deep: "#5B21B6", mid: "#C084FC", light: "#F6F0FF" },
    design: { ...DEFAULT_ORB_DESIGN, cloudScale: 1.05, warp: 0.9, bandAngle: 1.05, glow: 0.28 },
  },
  {
    id: "glacier",
    label: "Glacier",
    colors: { deep: "#7DD3FC", mid: "#E0F2FE", light: "#FFFFFF" },
    design: { ...DEFAULT_ORB_DESIGN, cloudScale: 0.9, warp: 0.48, bandWidth: 0.72, verticalBias: 0.45, glow: 0.1, vignette: 0.04 },
  },
  {
    id: "ember",
    label: "Ember",
    colors: { deep: "#C2410C", mid: "#FDBA74", light: "#FFF7ED" },
    design: { ...DEFAULT_ORB_DESIGN, cloudScale: 1.4, warp: 0.85, bandAngle: 2.2, verticalBias: 0.95, glow: 0.22 },
  },
];

function wash(hex: string): string {
  const raw = hex.trim().replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((channel) => channel + channel).join("") : raw.slice(0, 6);
  const value = Number.parseInt(full, 16);
  if (!Number.isFinite(value)) return hex;
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const luma = red * 0.3 + green * 0.59 + blue * 0.11;
  const mix = (channel: number) => Math.round(luma + (channel - luma) * GRAY_WASH).toString(16).padStart(2, "0");
  return `#${mix(red)}${mix(green)}${mix(blue)}`;
}

function Field({
  label,
  value,
  min,
  max,
  step,
  digits = 2,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  digits?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-[12px] text-neutral-500">
      <span className="flex items-center justify-between">
        {label}
        <span className="tabular-nums text-neutral-700">{value.toFixed(digits)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full accent-[#0A84FF]"
      />
    </label>
  );
}

function isOrbState(value: string | null): value is OrbState {
  return STATES.some((state) => state === value);
}

function readBoot(): { state: OrbState; level: number; panel: boolean; look: Look } {
  if (typeof window === "undefined") return { state: "idle", level: 0.35, panel: true, look: LOOKS[0] };
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("state");
  const rawLevel = params.get("level");
  const requestedLevel = rawLevel === null ? Number.NaN : Number(rawLevel);
  const requestedLook = LOOKS.find((look) => look.id === params.get("look"));
  return {
    state: isOrbState(requested) ? requested : "idle",
    level: Number.isFinite(requestedLevel) ? Math.min(1, Math.max(0, requestedLevel)) : 0.35,
    panel: params.get("panel") !== "0",
    look: requestedLook ?? LOOKS[0],
  };
}

function MicMeter({ source }: { source: MediaStream }) {
  const levelRef = useAudioLevel(source);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const node = barRef.current;
      if (node) node.style.transform = `scaleX(${levelRef.current ?? 0})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [levelRef]);

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
      <div ref={barRef} className="h-full origin-left rounded-full bg-[#0A84FF]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

export default function OrbDemo() {
  const boot = useState(readBoot)[0];
  const [state, setState] = useState<OrbState>(boot.state);
  const [level, setLevel] = useState(boot.level);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [volumeOn, setVolumeOn] = useState(true);
  const [panelOpen, setPanelOpen] = useState(boot.panel);
  const [lookId, setLookId] = useState<LookId | "custom">(boot.look.id);
  const [colors, setColors] = useState<OrbColors>(boot.look.colors);
  const [design, setDesign] = useState<OrbDesign>(boot.look.design);
  const [orbSize, setOrbSize] = useState(280);
  const previousState = useRef<OrbState>(boot.state === "muted" ? "idle" : boot.state);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleMute = () => {
    setState((current) => {
      if (current === "muted") {
        return previousState.current === "muted" ? "idle" : previousState.current;
      }
      previousState.current = current;
      return "muted";
    });
  };

  const enableMic = async () => {
    primeAudioContext();
    setMicError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("This browser can't access a microphone.");
      }
      const next = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
        video: false,
      });
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = next;
      setStream(next);
      setState((current) => (current === "muted" ? current : "listening"));
    } catch (error) {
      const message =
        error instanceof DOMException
          ? error.name === "NotAllowedError"
            ? "Microphone permission was denied."
            : error.message
          : error instanceof Error
            ? error.message
            : "Couldn't open the microphone.";
      setMicError(message);
    }
  };

  const disableMic = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStream(null);
  };

  const applyLook = (look: Look) => {
    setLookId(look.id);
    setColors(look.colors);
    setDesign(look.design);
  };

  const editDesign = (key: keyof OrbDesign, value: number) => {
    setLookId("custom");
    setDesign((current) => ({ ...current, [key]: value }));
  };

  const palette = volumeOn
    ? colors
    : { deep: wash(colors.deep), mid: wash(colors.mid), light: wash(colors.light) };

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white text-neutral-800">
      <div className="absolute top-5 right-5 z-10 flex items-center gap-1">
        <button
          type="button"
          aria-pressed={captionsOn}
          aria-label={captionsOn ? "Hide captions" : "Show captions"}
          onClick={() => setCaptionsOn((on) => !on)}
          className={`grid size-10 place-items-center rounded-full ${captionsOn ? "bg-neutral-100 text-neutral-900" : "text-neutral-600"}`}
        >
          <Captions size={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-pressed={volumeOn}
          aria-label={volumeOn ? "Mute volume" : "Unmute volume"}
          onClick={() => setVolumeOn((on) => !on)}
          className="grid size-10 place-items-center rounded-full text-neutral-600"
        >
          {volumeOn ? <Volume2 size={20} strokeWidth={1.75} /> : <VolumeX size={20} strokeWidth={1.75} />}
        </button>
        <button
          type="button"
          aria-pressed={panelOpen}
          aria-label={panelOpen ? "Hide settings" : "Show settings"}
          onClick={() => setPanelOpen((open) => !open)}
          className={`grid size-10 place-items-center rounded-full ${panelOpen ? "bg-neutral-100 text-neutral-900" : "text-neutral-600"}`}
        >
          <Settings size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="-translate-y-8">
          <AIOrb
            size={orbSize}
            state={state}
            level={stream ? undefined : level}
            audioSource={stream}
            colors={palette}
            design={design}
          />
          {captionsOn ? (
            <p className="mt-8 text-center text-[15px] tracking-[-0.01em] text-neutral-500">{CAPTIONS[state]}</p>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={toggleMute}
        aria-pressed={state === "muted"}
        aria-label={state === "muted" ? "Unmute" : "Mute"}
        className="absolute bottom-7 left-7 z-10 grid size-[68px] place-items-center rounded-full bg-[#FF3B30] text-white"
      >
        {state === "muted" ? <MicOff size={26} strokeWidth={1.75} /> : <Mic size={26} strokeWidth={1.75} />}
      </button>

      <Link
        href="/"
        aria-label="Close"
        className="absolute right-7 bottom-7 z-10 grid size-[68px] place-items-center rounded-full bg-[#E5E5EA] text-neutral-900"
      >
        <X size={26} strokeWidth={1.75} />
      </Link>

      {panelOpen ? (
        <section className="absolute top-20 bottom-36 left-5 z-10 flex w-[280px] flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
          <div className="border-b border-neutral-100 px-4 py-3">
            <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">Look</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {LOOKS.map((look) => (
                <button
                  key={look.id}
                  type="button"
                  aria-pressed={lookId === look.id}
                  onClick={() => applyLook(look)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] ${
                    lookId === look.id ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  <span className="flex -space-x-1">
                    {[look.colors.deep, look.colors.mid, look.colors.light].map((swatch) => (
                      <span key={swatch} className="size-2.5 rounded-full ring-1 ring-white" style={{ background: swatch }} />
                    ))}
                  </span>
                  {look.label}
                </button>
              ))}
              {lookId === "custom" ? (
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[12px] text-neutral-500">Custom</span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
            <div className="flex gap-3">
              {(
                [
                  ["deep", "Deep"],
                  ["mid", "Mid"],
                  ["light", "Light"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex flex-1 flex-col items-center gap-1 text-[11px] text-neutral-500">
                  <input
                    type="color"
                    aria-label={`${label} color`}
                    value={colors[key]}
                    onChange={(event) => {
                      const next = event.target.value;
                      setLookId("custom");
                      setColors((current) => ({ ...current, [key]: next }));
                    }}
                    className="size-8 cursor-pointer appearance-none rounded-full border border-neutral-200 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                  />
                  {label}
                </label>
              ))}
            </div>

            <Field label="Size" value={orbSize} min={180} max={420} step={4} digits={0} onChange={setOrbSize} />
            <Field label="Cloud scale" value={design.cloudScale} min={0.6} max={2.4} step={0.02} onChange={(value) => editDesign("cloudScale", value)} />
            <Field label="Warp" value={design.warp} min={0.15} max={1.6} step={0.02} onChange={(value) => editDesign("warp", value)} />
            <Field label="Band angle" value={(design.bandAngle * 180) / Math.PI} min={0} max={180} step={1} digits={0} onChange={(degrees) => editDesign("bandAngle", (degrees * Math.PI) / 180)} />
            <Field label="Band width" value={design.bandWidth} min={0.15} max={1.1} step={0.02} onChange={(value) => editDesign("bandWidth", value)} />
            <Field label="Bottom weight" value={design.verticalBias} min={0.2} max={1.2} step={0.02} onChange={(value) => editDesign("verticalBias", value)} />
            <Field label="Edge softness" value={design.edge} min={0.005} max={0.12} step={0.005} digits={3} onChange={(value) => editDesign("edge", value)} />
            <Field label="Inner glow" value={design.glow} min={0} max={0.5} step={0.01} onChange={(value) => editDesign("glow", value)} />
            <Field label="Vignette" value={design.vignette} min={0} max={0.35} step={0.01} onChange={(value) => editDesign("vignette", value)} />
          </div>
        </section>
      ) : null}

      {panelOpen ? (
        <section className="absolute right-24 bottom-6 left-[312px] z-10 rounded-2xl border border-neutral-200/80 bg-white/90 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
          <div className="flex flex-wrap gap-1.5">
            {STATES.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={state === option}
                onClick={() => {
                  if (option !== "muted") previousState.current = option;
                  setState(option);
                }}
                className={`rounded-full px-3 py-1 text-[13px] capitalize ${
                  state === option ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <label className="mt-3 block text-[12px] text-neutral-500">
            <span className="flex items-center justify-between">
              Audio level
              <span className="tabular-nums text-neutral-700">{stream ? "mic" : level.toFixed(2)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={level}
              disabled={stream !== null}
              onChange={(event) => setLevel(Number(event.target.value))}
              className="mt-1.5 w-full accent-[#0A84FF] disabled:opacity-40"
            />
          </label>

          {stream ? (
            <div className="mt-2">
              <MicMeter source={stream} />
            </div>
          ) : null}

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-[12px] text-neutral-400">{micError ?? "Listening and speaking follow this level."}</p>
            {stream ? (
              <button type="button" onClick={disableMic} className="shrink-0 text-[12px] font-medium text-neutral-700">
                Stop mic
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void enableMic()}
                className="shrink-0 text-[12px] font-medium text-[#0A84FF]"
              >
                Use microphone
              </button>
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}
