"use client";

import { useEffect, useRef, type RefObject } from "react";

export type AudioLevelSource = MediaStream | HTMLAudioElement | null | undefined;

type AudioContextCtor = typeof AudioContext;

const ATTACK = 0.3;
const RELEASE = 0.05;

let sharedContext: AudioContext | null = null;

function getAudioContextCtor(): AudioContextCtor | undefined {
  if (typeof window === "undefined") return undefined;
  if (typeof window.AudioContext === "function") return window.AudioContext;
  const legacy = (window as Window & { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
  return typeof legacy === "function" ? legacy : undefined;
}

function getOrCreateContext(): AudioContext | null {
  const Ctor = getAudioContextCtor();
  if (!Ctor) return null;
  if (!sharedContext || sharedContext.state === "closed") {
    sharedContext = new Ctor();
  }
  return sharedContext;
}

/**
 * Call synchronously inside a click/tap handler before `getUserMedia`.
 * Browsers only resume an AudioContext from a user gesture; the hook's
 * effect runs too late to count as one.
 */
export function primeAudioContext(): void {
  const context = getOrCreateContext();
  if (context && context.state === "suspended") {
    void context.resume();
  }
}

function isMediaStream(source: AudioLevelSource): source is MediaStream {
  return typeof MediaStream !== "undefined" && source instanceof MediaStream;
}

/**
 * Smoothed 0–1 RMS level for a mic stream or an `<audio>` element.
 * The value lives on a ref so a render loop can read it without re-rendering.
 * Attack is fast (~0.3 per 60fps frame); release is slow (~0.05).
 */
const elementSources = new WeakMap<HTMLAudioElement, MediaElementAudioSourceNode>();

export function useAudioLevel(source?: AudioLevelSource): RefObject<number> {
  const levelRef = useRef(0);

  useEffect(() => {
    if (!source) {
      levelRef.current = 0;
      return;
    }

    const context = getOrCreateContext();
    if (!context) return;

    let node: MediaStreamAudioSourceNode | MediaElementAudioSourceNode;
    let ownsNode = false;
    try {
      if (isMediaStream(source)) {
        node = context.createMediaStreamSource(source);
        ownsNode = true;
      } else {
        const existing = elementSources.get(source);
        if (existing) {
          node = existing;
        } else {
          node = context.createMediaElementSource(source);
          elementSources.set(source, node);
          node.connect(context.destination);
        }
      }
    } catch {
      levelRef.current = 0;
      return;
    }

    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    node.connect(analyser);

    const bins = new Uint8Array(analyser.fftSize);
    let smooth = 0;
    let raf = 0;
    let alive = true;

    const resume = () => {
      if (context.state === "suspended") void context.resume();
    };
    resume();
    window.addEventListener("pointerdown", resume);

    const tick = () => {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      if (document.hidden || context.state !== "running") return;

      analyser.getByteTimeDomainData(bins);
      let sum = 0;
      for (let i = 0; i < bins.length; i++) {
        const sample = ((bins[i] ?? 128) - 128) / 128;
        sum += sample * sample;
      }
      const rms = Math.sqrt(sum / bins.length);
      const normalized = Math.min(1, Math.max(0, rms - 0.015) / 0.2);
      const k = normalized > smooth ? ATTACK : RELEASE;
      smooth += (normalized - smooth) * k;
      levelRef.current = smooth;
    };

    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", resume);
      levelRef.current = 0;
      try {
        node.disconnect(analyser);
      } catch {
        // Already disconnected from this analyser.
      }
      if (ownsNode) {
        try {
          node.disconnect();
        } catch {
          // Stream source may already be disconnected.
        }
      }
      try {
        analyser.disconnect();
      } catch {
        // Analyser may already be disconnected.
      }
    };
  }, [source]);

  return levelRef;
}
