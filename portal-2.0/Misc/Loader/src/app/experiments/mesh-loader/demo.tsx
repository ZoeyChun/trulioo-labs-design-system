"use client";

import { useState } from "react";
import {
  DEFAULT_MESH_BASE,
  DEFAULT_MESH_COLORS,
  DEFAULT_MESH_LOGO,
  MeshLoader,
} from "@/components/portal/mesh-loader";

type PaletteId = "figma" | "deep" | "dawn" | "cool";

type Palette = {
  id: PaletteId;
  label: string;
  colors: readonly string[];
  base: string;
  logo: string;
};

const PALETTES: Palette[] = [
  {
    id: "figma",
    label: "Figma",
    colors: DEFAULT_MESH_COLORS,
    base: DEFAULT_MESH_BASE,
    logo: DEFAULT_MESH_LOGO,
  },
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

const COLOR_LABELS = ["Gold", "Mint", "Aqua", "Forest", "Blue", "Teal"] as const;

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
        <span className="tabular-nums text-neutral-800">{value.toFixed(digits)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full accent-[#005A50]"
      />
    </label>
  );
}

export function MeshLoaderDemo() {
  const [paletteId, setPaletteId] = useState<PaletteId | "custom">("figma");
  const [colors, setColors] = useState<string[]>([...DEFAULT_MESH_COLORS]);
  const [base, setBase] = useState(DEFAULT_MESH_BASE);
  const [logoColor, setLogoColor] = useState(DEFAULT_MESH_LOGO);
  const [size, setSize] = useState(180);
  const [speed, setSpeed] = useState(1);
  const [blur, setBlur] = useState(0.14);
  const [blobScale, setBlobScale] = useState(1);
  const [logoScale, setLogoScale] = useState(1);
  const [paused, setPaused] = useState(false);

  const applyPalette = (palette: Palette) => {
    setPaletteId(palette.id);
    setColors([...palette.colors]);
    setBase(palette.base);
    setLogoColor(palette.logo);
  };

  const shared = { speed, blur, blobScale, logoScale, logoColor, colors, base, paused };

  return (
    <main className="relative min-h-screen bg-[#18181B] text-neutral-800">
      <section className="absolute top-6 bottom-6 left-5 z-10 flex w-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
        <div className="border-b border-neutral-100 px-4 py-3">
          <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">Palette</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PALETTES.map((palette) => (
              <button
                key={palette.id}
                type="button"
                aria-pressed={paletteId === palette.id}
                onClick={() => applyPalette(palette)}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] ${
                  paletteId === palette.id ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600"
                }`}
              >
                <span className="size-2.5 rounded-full" style={{ background: palette.colors[3] }} />
                {palette.label}
              </button>
            ))}
            {paletteId === "custom" ? (
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[12px] text-neutral-500">Custom</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            {COLOR_LABELS.map((label, index) => (
              <label key={label} className="flex flex-col items-center gap-1 text-[11px] text-neutral-500">
                <input
                  type="color"
                  aria-label={`${label} blob`}
                  value={colors[index]}
                  onChange={(event) => {
                    const next = event.target.value;
                    setPaletteId("custom");
                    setColors((current) => current.map((color, colorIndex) => (colorIndex === index ? next : color)));
                  }}
                  className="size-8 cursor-pointer appearance-none rounded-full border border-neutral-200 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
                />
                {label}
              </label>
            ))}
          </div>

          <div className="flex gap-4">
            <label className="flex flex-1 flex-col items-center gap-1 text-[11px] text-neutral-500">
              <input
                type="color"
                aria-label="Base color"
                value={base}
                onChange={(event) => {
                  setPaletteId("custom");
                  setBase(event.target.value);
                }}
                className="size-8 cursor-pointer appearance-none rounded-full border border-neutral-200 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
              />
              Base
            </label>
            <label className="flex flex-1 flex-col items-center gap-1 text-[11px] text-neutral-500">
              <input
                type="color"
                aria-label="Logo color"
                value={logoColor}
                onChange={(event) => {
                  setPaletteId("custom");
                  setLogoColor(event.target.value);
                }}
                className="size-8 cursor-pointer appearance-none rounded-full border border-neutral-200 bg-transparent p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
              />
              Logo
            </label>
          </div>

          <Field label="Size" value={size} min={80} max={320} step={2} digits={0} onChange={setSize} />
          <Field label="Speed" value={speed} min={0.25} max={2.5} step={0.05} onChange={setSpeed} />
          <Field label="Blur" value={blur} min={0.04} max={0.32} step={0.01} onChange={setBlur} />
          <Field label="Blob size" value={blobScale} min={0.6} max={1.6} step={0.02} onChange={setBlobScale} />
          <Field label="Logo size" value={logoScale} min={0.6} max={1.4} step={0.02} onChange={setLogoScale} />

          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
            className={`mt-1 rounded-full px-3 py-1.5 text-[12px] ${
              paused ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </section>

      <div className="flex min-h-screen flex-col items-center justify-center gap-14 pr-8 pl-[340px]">
        <MeshLoader size={size} {...shared} />
        <div className="flex items-end gap-8">
          <MeshLoader size={64} {...shared} />
          <MeshLoader size={40} {...shared} />
          <MeshLoader size={24} {...shared} />
        </div>
      </div>
    </main>
  );
}
