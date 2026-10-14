"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ORB_BLEED, orbFragmentShader } from "./orb.frag";
import { orbVertexShader } from "./orb.vert";
import { useAudioLevel, type AudioLevelSource } from "./useAudioLevel";

export type OrbState = "idle" | "listening" | "thinking" | "speaking" | "muted";

export type OrbColors = {
  deep: string;
  mid: string;
  light: string;
};

/** Live shape controls. Defaults match the original voice orb. */
export type OrbDesign = {
  /** Spatial frequency. Lower = bigger, softer clouds. */
  cloudScale: number;
  /** How far domain warping pushes the clouds. */
  warp: number;
  /** Diagonal light band in radians. ~0.785 is bottom-left to upper-right. */
  bandAngle: number;
  /** Half-width of that band. Higher = a broader wash. */
  bandWidth: number;
  /** Alpha falloff inside the rim. */
  edge: number;
  /** How hard the deep color pools at the bottom. */
  verticalBias: number;
  /** Fresnel-like inner rim light. */
  glow: number;
  /** Inner-edge darkening. */
  vignette: number;
};

/** A number, or a ref updated outside React (see `useAudioLevel`). */
export type OrbLevel = number | { readonly current: number };

export type AIOrbProps = {
  size?: number;
  state?: OrbState;
  level?: OrbLevel;
  audioSource?: AudioLevelSource;
  colors?: OrbColors;
  design?: OrbDesign;
  /** Freeze the swirl and pulse until `level` or the microphone rises. */
  voiceDriven?: boolean;
  className?: string;
};

export const DEFAULT_ORB_COLORS: OrbColors = {
  deep: "#0A84FF",
  mid: "#5AC8FA",
  light: "#F3FBFF",
};

export const DEFAULT_ORB_DESIGN: OrbDesign = {
  cloudScale: 1.22,
  warp: 0.72,
  bandAngle: 0.785,
  bandWidth: 0.5,
  edge: 0.045,
  verticalBias: 0.8,
  glow: 0.18,
  vignette: 0.1,
};

const STATE_INDEX: Record<OrbState, number> = {
  idle: 0,
  listening: 1,
  thinking: 2,
  speaking: 3,
  muted: 4,
};

type Preset = {
  speed: number;
  warp: number;
  brightness: number;
  saturation: number;
  /** How strongly `level` is allowed to move the orb in this state. */
  influence: number;
};

const PRESETS: Record<OrbState, Preset> = {
  idle: { speed: 0.15, warp: 1, brightness: 1, saturation: 1, influence: 0.15 },
  listening: { speed: 0.26, warp: 1.12, brightness: 1.04, saturation: 1, influence: 1 },
  thinking: { speed: 0.6, warp: 1.22, brightness: 1.1, saturation: 1.03, influence: 0.3 },
  speaking: { speed: 0.34, warp: 1.24, brightness: 1.06, saturation: 1, influence: 1 },
  muted: { speed: 0.04, warp: 0.68, brightness: 0.92, saturation: 0.55, influence: 0 },
};

const STATE_LAMBDA = 7.5;
const ATTACK = 0.3;
const RELEASE = 0.05;

const FALLBACK_CSS = `
@keyframes aiorb-fallback-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .aiorb-fallback-rotor { animation: none !important; }
}
`;

type Rgb = [number, number, number];

type Sim = {
  speed: number;
  warp: number;
  brightness: number;
  saturation: number;
  influence: number;
  level: number;
  scale: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function damp(current: number, target: number, dt: number, lambda = STATE_LAMBDA): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/** Frame-rate independent attack/release. `factor` is the per-frame amount at 60fps. */
function follow(current: number, target: number, dt: number, factor: number): number {
  const frames = Math.max(0, dt * 60);
  const k = 1 - (1 - factor) ** frames;
  return current + (target - current) * k;
}

function parseHex(hex: string): Rgb {
  const raw = hex.trim().replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : raw.padEnd(6, "0").slice(0, 6);
  const value = Number.parseInt(full, 16);
  if (!Number.isFinite(value)) return [10 / 255, 132 / 255, 1];
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function readManualLevel(level: OrbLevel | undefined): number | null {
  if (typeof level === "number" && Number.isFinite(level)) return clamp(level, 0, 1);
  if (level && typeof level === "object" && typeof level.current === "number" && Number.isFinite(level.current)) {
    return clamp(level.current, 0, 1);
  }
  return null;
}

function targetScale(state: OrbState, elapsed: number, amplitude: number, reduced: boolean): number {
  if (reduced || state === "muted") return 1;
  if (state === "idle") {
    const breath = Math.sin((elapsed * Math.PI * 2) / 4) * 0.5 + 0.5;
    return 1 + breath * 0.03;
  }
  if (state === "listening") return 1 + amplitude * 0.06;
  if (state === "thinking") return 1 + Math.sin(elapsed * 3.2) * 0.012;
  return 1 + Math.sin(elapsed * 2.5) * 0.015 + amplitude * 0.05;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "Shader compile failed";
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
}

function FallbackOrb({ size, colors }: { size: number; colors: OrbColors }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-full"
      style={{
        background: `radial-gradient(circle at 50% 100%, ${colors.deep} 0%, transparent 58%), radial-gradient(circle at 50% 28%, ${colors.light} 0%, transparent 42%), ${colors.mid}`,
      }}
    >
      <div
        className="aiorb-fallback-rotor absolute top-[-22%] left-[-22%] h-[144%] w-[144%]"
        style={{
          background: `conic-gradient(from 200deg, ${colors.deep}, ${colors.mid} 28%, ${colors.light} 52%, ${colors.mid} 74%, ${colors.deep})`,
          filter: "blur(16px)",
          animation: "aiorb-fallback-spin 28s linear infinite",
        }}
      />
      <span className="sr-only">Animated orb, {size}px</span>
    </div>
  );
}

export function AIOrb({
  size = 280,
  state = "idle",
  level,
  audioSource = null,
  colors = DEFAULT_ORB_COLORS,
  design = DEFAULT_ORB_DESIGN,
  voiceDriven = false,
  className,
}: AIOrbProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ state, level, colors, design, voiceDriven });
  const audioLevelRef = useAudioLevel(audioSource);

  useEffect(() => {
    propsRef.current = { state, level, colors, design, voiceDriven };
  }, [state, level, colors, design, voiceDriven]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let alive = true;
    let raf = 0;
    let onScreen = true;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    const releaseGl = (
      program: WebGLProgram | null,
      buffer: WebGLBuffer | null,
      vertex: WebGLShader | null,
      fragment: WebGLShader | null,
    ) => {
      if (!gl) return;
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
    };

    if (!gl) {
      canvas.hidden = true;
      if (fallbackRef.current) fallbackRef.current.hidden = false;
      return;
    }

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let vertex: WebGLShader | null = null;
    let fragment: WebGLShader | null = null;

    try {
      vertex = compileShader(gl, gl.VERTEX_SHADER, orbVertexShader);
      fragment = compileShader(gl, gl.FRAGMENT_SHADER, orbFragmentShader);
      program = gl.createProgram();
      if (!program) throw new Error("Unable to create program");
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.bindAttribLocation(program, 0, "aPosition");
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed");
      }
      gl.useProgram(program);

      buffer = gl.createBuffer();
      if (!buffer) throw new Error("Unable to create buffer");
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } catch (error) {
      console.error("AIOrb WebGL init failed", error);
      releaseGl(program, buffer, vertex, fragment);
      if (alive) {
        canvas.hidden = true;
        if (fallbackRef.current) fallbackRef.current.hidden = false;
      }
      return;
    }

    if (fallbackRef.current) fallbackRef.current.hidden = true;

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uTime = uniform("uTime");
    const uResolution = uniform("uResolution");
    const uColorDeep = uniform("uColorDeep");
    const uColorMid = uniform("uColorMid");
    const uColorLight = uniform("uColorLight");
    const uAmplitude = uniform("uAmplitude");
    const uSpeed = uniform("uSpeed");
    const uState = uniform("uState");
    const uWarp = uniform("uWarp");
    const uBrightness = uniform("uBrightness");
    const uSaturation = uniform("uSaturation");
    const uScale = uniform("uScale");
    const uCloudScale = uniform("uCloudScale");
    const uWarpStrength = uniform("uWarpStrength");
    const uBandAngle = uniform("uBandAngle");
    const uBandWidth = uniform("uBandWidth");
    const uEdgeSoftness = uniform("uEdgeSoftness");
    const uVerticalBias = uniform("uVerticalBias");
    const uGlow = uniform("uGlow");
    const uVignette = uniform("uVignette");

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    const onMotion = () => {
      reduced = motionQuery.matches;
    };
    motionQuery.addEventListener("change", onMotion);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false;
        if (onScreen && !document.hidden) {
          last = performance.now();
          schedule();
        }
      },
      { threshold: 0 },
    );
    observer.observe(host);

    const onVisibility = () => {
      if (!document.hidden && onScreen) {
        last = performance.now();
        schedule();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const initial = PRESETS[propsRef.current.state];
    const sim: Sim = {
      speed: initial.speed,
      warp: initial.warp,
      brightness: initial.brightness,
      saturation: initial.saturation,
      influence: initial.influence,
      level: 0,
      scale: 1,
    };
    let elapsed = 0;
    let last = performance.now();

    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    const draw = (dt: number) => {
      const current = propsRef.current;
      const preset = PRESETS[current.state];
      const speedScale = reduced ? 0.08 : 1;
      sim.speed = damp(sim.speed, preset.speed * speedScale, dt);
      sim.warp = damp(sim.warp, preset.warp, dt);
      sim.brightness = damp(sim.brightness, preset.brightness, dt);
      sim.saturation = damp(sim.saturation, preset.saturation, dt);
      sim.influence = damp(sim.influence, current.voiceDriven ? 1 : preset.influence, dt);

      const manual = readManualLevel(current.level);
      const raw = manual ?? audioLevelRef.current ?? 0;
      if (manual !== null) {
        const rising = raw > sim.level;
        sim.level = follow(sim.level, raw, dt, rising ? ATTACK : RELEASE);
      } else {
        sim.level = raw;
      }
      const amplitude = sim.level * sim.influence;
      const voice = current.voiceDriven ? (amplitude > 0.05 ? amplitude : 0) : 1;

      elapsed += dt * voice;
      const scaleTarget = current.voiceDriven
        ? 1 + voice * 0.06
        : targetScale(current.state, elapsed, amplitude, reduced);
      sim.scale = damp(sim.scale, scaleTarget, dt, 12);
      const scale = clamp(sim.scale, 0.94, 1.065);

      const deep = parseHex(current.colors.deep);
      const mid = parseHex(current.colors.mid);
      const light = parseHex(current.colors.light);

      syncSize();
      gl.useProgram(program);
      gl.uniform1f(uTime, elapsed);
      gl.uniform3f(uColorDeep, deep[0], deep[1], deep[2]);
      gl.uniform3f(uColorMid, mid[0], mid[1], mid[2]);
      gl.uniform3f(uColorLight, light[0], light[1], light[2]);
      gl.uniform1f(uAmplitude, amplitude);
      gl.uniform1f(uSpeed, sim.speed);
      gl.uniform1f(uState, STATE_INDEX[current.state]);
      gl.uniform1f(uWarp, sim.warp);
      gl.uniform1f(uBrightness, sim.brightness);
      gl.uniform1f(uSaturation, sim.saturation);
      gl.uniform1f(uScale, scale);
      gl.uniform1f(uCloudScale, current.design.cloudScale);
      gl.uniform1f(uWarpStrength, current.design.warp);
      gl.uniform1f(uBandAngle, current.design.bandAngle);
      gl.uniform1f(uBandWidth, Math.max(0.05, current.design.bandWidth));
      gl.uniform1f(uEdgeSoftness, current.design.edge);
      gl.uniform1f(uVerticalBias, current.design.verticalBias);
      gl.uniform1f(uGlow, current.design.glow);
      gl.uniform1f(uVignette, current.design.vignette);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (document.hidden || !onScreen) return;
      draw(dt);
      schedule();
    };

    const schedule = () => {
      if (!alive || raf !== 0 || document.hidden || !onScreen) return;
      raf = requestAnimationFrame(frame);
    };

    schedule();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      raf = 0;
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotion);
      releaseGl(program, buffer, vertex, fragment);
    };
  }, [audioLevelRef]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="AI orb"
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: size * ORB_BLEED, height: size * ORB_BLEED }}
      />
      <div ref={fallbackRef} hidden className="absolute inset-0">
        <style>{FALLBACK_CSS}</style>
        <FallbackOrb size={size} colors={colors} />
      </div>
    </div>
  );
}
