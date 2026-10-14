"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ModeOpts, OrbState as ThinkingState } from "thinking-orbs";
import {
  AIOrb,
  DEFAULT_ORB_COLORS,
  DEFAULT_ORB_DESIGN,
  primeAudioContext,
  useAudioLevel,
  type OrbColors,
  type OrbDesign,
  type OrbState as VoiceState,
} from "@/components/AIOrb";
import { AiOrb } from "../ai-orb";
import { LogoBreath } from "../logo-breath";
import { LogoMark, type LogoMotion } from "../logo-mark";
import {
  DEFAULT_MESH_BASE,
  DEFAULT_MESH_COLORS,
  DEFAULT_MESH_LOGO,
  MeshLoader,
} from "@/components/portal/mesh-loader";
import { cn } from "@/lib/utils";
import { TruAiDrawer } from "./truai-drawer";

const THINKING_STATES: { state: ThinkingState; label: string }[] = [
  { state: "working", label: "Working" },
  { state: "searching", label: "Searching" },
  { state: "solving", label: "Solving" },
  { state: "listening", label: "Listening" },
  { state: "connecting", label: "Connecting" },
  { state: "weaving", label: "Weaving" },
  { state: "composing", label: "Composing" },
  { state: "breathing", label: "Breathing" },
  { state: "shaping", label: "Shaping" },
];

const VOICE_STATES: VoiceState[] = ["idle", "listening", "thinking", "speaking", "muted"];

const SPEEDS = [0.5, 1, 2] as const;

/** The library only tunes 20, 32, and 64. Larger sizes scale the 64px artwork. */
function tunedThinkingSize(px: number): 64 | 32 | 20 {
  if (px >= 48) return 64;
  if (px >= 26) return 32;
  return 20;
}

const INKS = [
  { label: "TruAI", value: "#8F2CF3" },
  { label: "Teal", value: "#008080" },
  { label: "Green", value: "#005A50" },
  { label: "Ink", value: "" },
] as const;

const DEFAULT_INK = "#8F2CF3";

type Knob = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  fallback: number;
};

const KNOBS: Partial<Record<ThinkingState, Knob[]>> = {
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

type ShapeHold = "cycle" | 0 | 1 | 2;

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
    design: {
      ...DEFAULT_ORB_DESIGN,
      cloudScale: 0.6,
      warp: 0.15,
      verticalBias: 0.72,
      edge: 0.085,
      glow: 0.14,
    },
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

const VOICE_FIELDS: { key: keyof OrbDesign; label: string; min: number; max: number; step: number; digits?: number; degrees?: boolean }[] = [
  { key: "cloudScale", label: "Cloud scale", min: 0.6, max: 2.4, step: 0.02 },
  { key: "warp", label: "Warp", min: 0.15, max: 1.6, step: 0.02 },
  { key: "bandAngle", label: "Band angle", min: 0, max: 180, step: 1, digits: 0, degrees: true },
  { key: "bandWidth", label: "Band width", min: 0.15, max: 1.1, step: 0.02 },
  { key: "verticalBias", label: "Bottom weight", min: 0.2, max: 1.2, step: 0.02 },
  { key: "edge", label: "Edge softness", min: 0.005, max: 0.12, step: 0.005, digits: 3 },
  { key: "glow", label: "Inner glow", min: 0, max: 0.5, step: 0.01 },
  { key: "vignette", label: "Vignette", min: 0, max: 0.35, step: 0.01 },
];

type Family = "thinking" | "voice" | "mesh";

type MeshPaletteId = "figma" | "deep" | "dawn" | "cool";

const MESH_PALETTES: {
  id: MeshPaletteId;
  label: string;
  colors: readonly string[];
  base: string;
  logo: string;
}[] = [
  { id: "figma", label: "Figma", colors: DEFAULT_MESH_COLORS, base: DEFAULT_MESH_BASE, logo: DEFAULT_MESH_LOGO },
  {
    id: "deep",
    label: "Deep",
    colors: ["#F6C453", "#7DCAA0", "#2E8F86", "#063D34", "#0E6E86", "#049A78"],
    base: "#1F6F68",
    logo: "#042E2A",
  },
  {
    id: "dawn",
    label: "Dawn",
    colors: ["#FFE08A", "#F7C9A0", "#F2A3B5", "#E07A5F", "#F4D35E", "#FAF3E3"],
    base: "#E8A87C",
    logo: "#5C2E1A",
  },
  {
    id: "cool",
    label: "Cool",
    colors: ["#B7F3FF", "#8AD7F2", "#5BA8E0", "#2F6F9F", "#7C9CFF", "#D7E6FF"],
    base: "#6AA8D6",
    logo: "#12324A",
  },
];

const MESH_COLOR_LABELS = ["Gold", "Mint", "Aqua", "Forest", "Blue", "Teal"] as const;
type Motion = "auto" | "voice";

function useHearing(source: MediaStream | null) {
  const levelRef = useAudioLevel(source);
  const [hearing, setHearing] = useState(false);

  useEffect(() => {
    if (!source) {
      setHearing(false);
      return;
    }
    let raf = 0;
    const tick = () => {
      const level = levelRef.current ?? 0;
      setHearing((current) => {
        const next = current ? level > 0.04 : level > 0.08;
        return next === current ? current : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [source, levelRef]);

  return hearing;
}

function formatValue(value: number, step: number, digits?: number) {
  if (digits !== undefined) return value.toFixed(digits);
  if (step >= 1) return String(Math.round(value));
  if (step >= 0.1) return value.toFixed(1);
  return value.toFixed(2);
}

export function OrbLab({ displayClassName }: { displayClassName: string }) {
  const [family, setFamily] = useState<Family>("thinking");
  const [motion, setMotion] = useState<Motion>("auto");

  const [thinkingState, setThinkingState] = useState<ThinkingState>("working");
  const [logoOn, setLogoOn] = useState(false);
  const [badgeOn, setBadgeOn] = useState(false);
  const [logoMotion, setLogoMotion] = useState<LogoMotion>("form");
  const [thinkingSize, setThinkingSize] = useState(122);
  const [speed, setSpeed] = useState<number>(1);
  const [paused, setPaused] = useState(false);
  const [ink, setInk] = useState("#005A50");
  const [dots, setDots] = useState(1);
  const [dotSize, setDotSize] = useState(1);
  const [shape, setShape] = useState<ShapeHold>("cycle");
  const [overrides, setOverrides] = useState<Partial<Record<ThinkingState, ModeOpts>>>({});

  const [lookId, setLookId] = useState<LookId | "custom">("trulioo");
  const [colors, setColors] = useState<OrbColors>(LOOKS[1].colors);
  const [design, setDesign] = useState<OrbDesign>(LOOKS[1].design);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [voiceSize, setVoiceSize] = useState(122);
  const [meshPaletteId, setMeshPaletteId] = useState<MeshPaletteId | "custom">("figma");
  const [meshColors, setMeshColors] = useState<string[]>([...DEFAULT_MESH_COLORS]);
  const [meshBase, setMeshBase] = useState(DEFAULT_MESH_BASE);
  const [meshLogo, setMeshLogo] = useState(DEFAULT_MESH_LOGO);
  const [meshSize, setMeshSize] = useState(132);
  const [meshSpeed, setMeshSpeed] = useState(1);
  const [meshBlur, setMeshBlur] = useState(0.14);
  const [meshBlobScale, setMeshBlobScale] = useState(1);
  const [meshLogoScale, setMeshLogoScale] = useState(1);
  const [meshShadow, setMeshShadow] = useState(0.35);
  const [meshShadowColor, setMeshShadowColor] = useState("#042E2A");
  const [meshPaused, setMeshPaused] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const hearing = useHearing(stream);

  function setKnob(state: ThinkingState, key: string, value: number) {
    setOverrides((current) => ({
      ...current,
      [state]: { ...current[state], [key]: value },
    }));
  }

  function thinkingOpts(): ModeOpts | undefined {
    const opts: ModeOpts = { ...overrides[thinkingState] };
    if (thinkingState === "shaping" && shape !== "cycle") opts.shape = shape;
    return Object.keys(opts).length > 0 ? opts : undefined;
  }

  function resetThinking() {
    setThinkingState("working");
    setThinkingSize(122);
    setSpeed(1);
    setPaused(false);
    setInk("#005A50");
    setDots(1);
    setDotSize(1);
    setShape("cycle");
    setOverrides({});
    setLogoOn(false);
    setBadgeOn(false);
    setLogoMotion("form");
  }

  function applyLook(look: Look) {
    setLookId(look.id);
    setColors(look.colors);
    setDesign(look.design);
  }

  function editDesign(key: keyof OrbDesign, value: number) {
    setLookId("custom");
    setDesign((current) => ({ ...current, [key]: value }));
  }

  function resetVoice() {
    applyLook(LOOKS[1]);
    setVoiceState("idle");
    setVoiceSize(122);
  }

  function applyMeshPalette(palette: (typeof MESH_PALETTES)[number]) {
    setMeshPaletteId(palette.id);
    setMeshColors([...palette.colors]);
    setMeshBase(palette.base);
    setMeshLogo(palette.logo);
  }

  function resetMesh() {
    applyMeshPalette(MESH_PALETTES[0]);
    setMeshSize(132);
    setMeshSpeed(1);
    setMeshBlur(0.14);
    setMeshBlobScale(1);
    setMeshLogoScale(1);
    setMeshShadow(0.35);
    setMeshShadowColor("#042E2A");
    setMeshPaused(false);
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function toggleMic() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
      setMicError(null);
      return;
    }

    primeAudioContext();
    setMicError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError("This browser can't access a microphone.");
      return;
    }

    void navigator.mediaDevices
      .getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false })
      .then((next) => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = next;
        setStream(next);
      })
      .catch((error: unknown) => {
        const message =
          error instanceof DOMException
            ? error.name === "NotAllowedError"
              ? "Microphone permission was denied."
              : error.message
            : error instanceof Error
              ? error.message
              : "Couldn't open the microphone.";
        setMicError(message);
      });
  }

  const voiceAnimate = motion === "voice";
  const tunedSize = tunedThinkingSize(thinkingSize);
  const orb =
    family === "thinking" ? (
      badgeOn ? (
        <LogoBreath
          size={thinkingSize}
          speed={speed}
          paused={paused || (voiceAnimate && !hearing)}
          color={ink}
          dots={dots}
          dotSize={dotSize}
        />
      ) : logoOn ? (
        <LogoMark
          size={thinkingSize}
          motion={logoMotion}
          speed={speed}
          paused={paused || (voiceAnimate && !hearing)}
          dark
          color={ink}
          dots={dots}
          dotSize={dotSize}
        />
      ) : (
      <div className="grid place-items-center" style={{ width: thinkingSize, height: thinkingSize }}>
        <div style={{ transform: `scale(${thinkingSize / tunedSize})` }}>
          <AiOrb
            state={thinkingState}
            size={tunedSize}
            speed={speed}
            paused={paused || (voiceAnimate && !hearing)}
            color={ink}
            dots={dots}
            dotSize={dotSize}
            opts={thinkingOpts()}
          />
        </div>
      </div>
      )
    ) : family === "voice" ? (
      <AIOrb
        size={voiceSize}
        state={voiceState}
        level={voiceAnimate && !stream ? 0 : undefined}
        audioSource={voiceAnimate ? stream : null}
        voiceDriven={voiceAnimate}
        colors={colors}
        design={design}
      />
    ) : (
      <MeshLoader
        size={meshSize}
        speed={meshSpeed}
        blur={meshBlur}
        blobScale={meshBlobScale}
        logoScale={meshLogoScale}
        logoColor={meshLogo}
        colors={meshColors}
        base={meshBase}
        shadow={meshShadow}
        shadowColor={meshShadowColor}
        paused={meshPaused || (voiceAnimate && !hearing)}
      />
    );

  return (
    <>
      <aside className="absolute top-3 bottom-3 left-3 z-10 flex w-[380px] max-w-[calc(100%-478px-2.25rem)] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#141414] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-[11px] font-medium tracking-[0.08em] text-white/40 uppercase">Orb</p>
            <h2 className="text-sm font-semibold">Design</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-full bg-white/8 p-1" role="group" aria-label="Animation">
              <Chip active={motion === "auto"} onClick={() => setMotion("auto")}>
                Auto
              </Chip>
              <Chip active={motion === "voice"} onClick={() => setMotion("voice")}>
                Voice
              </Chip>
            </div>
            <button
              type="button"
              onClick={family === "thinking" ? resetThinking : family === "voice" ? resetVoice : resetMesh}
              className="cursor-pointer text-xs font-medium text-white/50 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <div className="flex flex-wrap rounded-full bg-white/8 p-1" role="group" aria-label="Orb family">
            <Chip active={family === "thinking"} onClick={() => setFamily("thinking")}>
              Thinking
            </Chip>
            <Chip active={family === "voice"} onClick={() => setFamily("voice")}>
              Voice
            </Chip>
            <Chip active={family === "mesh"} onClick={() => setFamily("mesh")}>
              Mesh
            </Chip>
          </div>

          {family === "thinking" ? (
            <>
              <OptionGroup label="State">
                {THINKING_STATES.map(({ state, label }) => (
                  <Chip
                    key={state}
                    active={!logoOn && !badgeOn && thinkingState === state}
                    onClick={() => {
                      setLogoOn(false);
                      setBadgeOn(false);
                      setThinkingState(state);
                    }}
                  >
                    {label}
                  </Chip>
                ))}
                <Chip
                  active={logoOn}
                  onClick={() => {
                    setBadgeOn(false);
                    setLogoOn(true);
                  }}
                >
                  Logo
                </Chip>
                <Chip
                  active={badgeOn}
                  onClick={() => {
                    setLogoOn(false);
                    setBadgeOn(true);
                  }}
                >
                  Badge
                </Chip>
              </OptionGroup>

              {logoOn ? (
                <OptionGroup label="Motion">
                  {(
                    [
                      ["form", "Form"],
                      ["orbit", "Orbit"],
                      ["pulse", "Pulse"],
                      ["bloom", "Bloom"],
                    ] as const
                  ).map(([id, label]) => (
                    <Chip key={id} active={logoMotion === id} onClick={() => setLogoMotion(id)}>
                      {label}
                    </Chip>
                  ))}
                </OptionGroup>
              ) : null}

              <Slider label="Size" min={20} max={220} step={2} value={thinkingSize} digits={0} onChange={setThinkingSize} />

              <OptionGroup label="Speed">
                {SPEEDS.map((value) => (
                  <Chip key={value} active={speed === value} onClick={() => setSpeed(value)}>
                    {value}×
                  </Chip>
                ))}
                <Chip active={paused} onClick={() => setPaused((value) => !value)}>
                  {paused ? "Paused" : "Pause"}
                </Chip>
              </OptionGroup>

              <div>
                <p className="text-[11px] font-medium tracking-[0.08em] text-white/40 uppercase">Color</p>
                <div className="mt-2 flex items-center gap-2">
                  {INKS.map((swatch) => (
                    <button
                      key={swatch.label}
                      type="button"
                      aria-label={swatch.label}
                      aria-pressed={ink === swatch.value}
                      onClick={() => setInk(swatch.value)}
                      className={cn(
                        "size-7 cursor-pointer rounded-full border",
                        ink === swatch.value ? "ring-2 ring-white ring-offset-2 ring-offset-[#141414]" : "border-transparent",
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
                        ink && !INKS.some((swatch) => swatch.value === ink) ? "border-white" : "border-white/20",
                      )}
                      style={{ background: "conic-gradient(#8F2CF3, #008080, #005A50, #f4f6f4, #8F2CF3)" }}
                    />
                  </label>
                </div>
              </div>

              <Slider label="Density" min={0.4} max={2} step={0.1} value={dots} onChange={setDots} />
              <Slider label="Dot size" min={0.5} max={2} step={0.1} value={dotSize} onChange={setDotSize} />

              {(logoOn || badgeOn ? [] : (KNOBS[thinkingState] ?? [])).map((knob) => (
                <Slider
                  key={knob.key}
                  label={knob.label}
                  min={knob.min}
                  max={knob.max}
                  step={knob.step}
                  value={overrides[thinkingState]?.[knob.key] ?? knob.fallback}
                  onChange={(value) => setKnob(thinkingState, knob.key, value)}
                />
              ))}

              {!logoOn && !badgeOn && thinkingState === "shaping" ? (
                <OptionGroup label="Shape">
                  {SHAPES.map((option) => {
                    const id: ShapeHold = option.id === "cycle" ? "cycle" : (Number(option.id) as 0 | 1 | 2);
                    return (
                      <Chip key={option.id} active={shape === id} onClick={() => setShape(id)}>
                        {option.label}
                      </Chip>
                    );
                  })}
                </OptionGroup>
              ) : null}
            </>
          ) : family === "voice" ? (
            <>
              <OptionGroup label="Look">
                {LOOKS.map((look) => (
                  <Chip key={look.id} active={lookId === look.id} onClick={() => applyLook(look)}>
                    <span className="flex -space-x-1" aria-hidden>
                      {[look.colors.deep, look.colors.mid, look.colors.light].map((swatch) => (
                        <span key={swatch} className="size-2.5 rounded-full ring-1 ring-[#141414]" style={{ background: swatch }} />
                      ))}
                    </span>
                    {look.label}
                  </Chip>
                ))}
                {lookId === "custom" ? <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Custom</span> : null}
              </OptionGroup>

              <OptionGroup label="State">
                {VOICE_STATES.map((state) => (
                  <Chip key={state} active={voiceState === state} onClick={() => setVoiceState(state)}>
                    <span className="capitalize">{state}</span>
                  </Chip>
                ))}
              </OptionGroup>

              <div className="flex gap-3">
                {(
                  [
                    ["deep", "Deep"],
                    ["mid", "Mid"],
                    ["light", "Light"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex flex-1 flex-col items-center gap-1 text-[11px] text-white/50">
                    <input
                      type="color"
                      aria-label={`${label} color`}
                      value={colors[key]}
                      onChange={(event) => {
                        const next = event.target.value;
                        setLookId("custom");
                        setColors((current) => ({ ...current, [key]: next }));
                      }}
                      className="size-8 cursor-pointer appearance-none rounded-full border border-white/15 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                    />
                    {label}
                  </label>
                ))}
              </div>

              <Slider label="Size" min={72} max={140} step={2} value={voiceSize} digits={0} onChange={setVoiceSize} />
              {voiceAnimate ? (
                <p className="text-xs leading-[18px] text-white/45">The orb moves only while the microphone hears a voice.</p>
              ) : null}
              {VOICE_FIELDS.map((field) => (
                <Slider
                  key={field.key}
                  label={field.label}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  digits={field.digits}
                  value={field.degrees ? (design[field.key] * 180) / Math.PI : design[field.key]}
                  onChange={(value) => editDesign(field.key, field.degrees ? (value * Math.PI) / 180 : value)}
                />
              ))}
            </>
          ) : (
            <>
              <OptionGroup label="Palette">
                {MESH_PALETTES.map((palette) => (
                  <Chip key={palette.id} active={meshPaletteId === palette.id} onClick={() => applyMeshPalette(palette)}>
                    <span className="size-2.5 rounded-full" style={{ background: palette.colors[3] }} aria-hidden />
                    {palette.label}
                  </Chip>
                ))}
                {meshPaletteId === "custom" ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">Custom</span>
                ) : null}
              </OptionGroup>

              <div className="grid grid-cols-3 gap-3">
                {MESH_COLOR_LABELS.map((label, index) => (
                  <label key={label} className="flex flex-col items-center gap-1 text-[11px] text-white/50">
                    <input
                      type="color"
                      aria-label={`${label} blob`}
                      value={meshColors[index]}
                      onChange={(event) => {
                        const next = event.target.value;
                        setMeshPaletteId("custom");
                        setMeshColors((current) => current.map((color, colorIndex) => (colorIndex === index ? next : color)));
                      }}
                      className="size-8 cursor-pointer appearance-none rounded-full border border-white/15 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div className="flex gap-4">
                <label className="flex flex-1 flex-col items-center gap-1 text-[11px] text-white/50">
                  <input
                    type="color"
                    aria-label="Base color"
                    value={meshBase}
                    onChange={(event) => {
                      setMeshPaletteId("custom");
                      setMeshBase(event.target.value);
                    }}
                    className="size-8 cursor-pointer appearance-none rounded-full border border-white/15 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                  />
                  Base
                </label>
                <label className="flex flex-1 flex-col items-center gap-1 text-[11px] text-white/50">
                  <input
                    type="color"
                    aria-label="Logo color"
                    value={meshLogo}
                    onChange={(event) => {
                      setMeshPaletteId("custom");
                      setMeshLogo(event.target.value);
                    }}
                    className="size-8 cursor-pointer appearance-none rounded-full border border-white/15 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                  />
                  Logo
                </label>
              </div>

              <Slider label="Size" min={80} max={220} step={2} value={meshSize} digits={0} onChange={setMeshSize} />
              <Slider label="Speed" min={0.25} max={4} step={0.05} value={meshSpeed} onChange={setMeshSpeed} />
              <div className="flex items-end gap-3">
                <div className="min-w-0 flex-1">
                  <Slider label="Shadow" min={0} max={1} step={0.01} value={meshShadow} onChange={setMeshShadow} />
                </div>
                <label className="flex shrink-0 flex-col items-center gap-1 pb-0.5 text-[11px] text-white/50">
                  <input
                    type="color"
                    aria-label="Shadow color"
                    value={meshShadowColor}
                    onChange={(event) => setMeshShadowColor(event.target.value)}
                    className="size-8 cursor-pointer appearance-none rounded-full border border-white/15 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                  />
                  Color
                </label>
              </div>
              <Slider label="Blur" min={0.04} max={0.32} step={0.01} value={meshBlur} onChange={setMeshBlur} />
              <Slider label="Blob size" min={0.6} max={1.6} step={0.02} value={meshBlobScale} onChange={setMeshBlobScale} />
              <Slider label="Logo size" min={0.6} max={1.4} step={0.02} value={meshLogoScale} onChange={setMeshLogoScale} />
              <Chip active={meshPaused} onClick={() => setMeshPaused((value) => !value)}>
                {meshPaused ? "Paused" : "Pause"}
              </Chip>
              {voiceAnimate ? (
                <p className="text-xs leading-[18px] text-white/45">The orb moves only while the microphone hears a voice.</p>
              ) : null}
            </>
          )}
        </div>
      </aside>

      <TruAiDrawer
        displayClassName={displayClassName}
        orb={orb}
        micOn={stream !== null}
        micError={micError}
        onToggleMic={toggleMic}
      />
    </>
  );
}

function OptionGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.08em] text-white/40 uppercase">{label}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        active ? "bg-white text-[#141414]" : "bg-white/10 text-white/70 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  digits,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  digits?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between gap-3 text-xs text-white/55">
        <span>{label}</span>
        <span className="tabular-nums text-white/80">{formatValue(value, step, digits)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 w-full cursor-pointer accent-white"
      />
    </label>
  );
}
