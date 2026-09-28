"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import "./sound-provider.css";

export type SoundConfig = {
  ambient: string;
  ui: { hover: string; click: string; toggle: string };
};
type SoundState = "armed" | "playing" | "off" | "blocked";
type SoundContextValue = { state: SoundState; enabled: boolean; toggle: (trusted: boolean) => void };
const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "sreeram-sound-enabled";
const FADE_MS = 150;

/** Audio elements and requests are created only after a trusted user gesture. */
export function SoundProvider({ config, children }: { config: SoundConfig; children: ReactNode }) {
  const [state, setState] = useState<SoundState>("armed");
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const gesturedRef = useRef(false);
  const toggleRef = useRef<(trusted: boolean) => void>(() => {});
  const { ambient: ambientPath, ui: { hover, click, toggle } } = config;

  useEffect(() => {
    let mounted = true;
    let ambient: HTMLAudioElement | undefined;
    let voices: HTMLAudioElement[] = [];
    let voiceIndex = 0;
    let fadeFrame = 0;
    let playAttempt = 0;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const paths = { hover, click, toggle };

    const status = (next: SoundState) => { if (mounted) setState(next); };
    const stopFade = () => { cancelAnimationFrame(fadeFrame); fadeFrame = 0; };
    const fade = (to: number, pauseAtEnd = false) => {
      stopFade();
      if (!ambient) return;
      const player = ambient;
      const from = player.volume;
      const start = performance.now();
      const step = (time: number) => {
        if (!mounted) return;
        const progress = Math.min(1, (time - start) / FADE_MS);
        const eased = progress * progress * (3 - 2 * progress);
        player.volume = from + (to - from) * eased;
        if (progress < 1) fadeFrame = requestAnimationFrame(step);
        else {
          fadeFrame = 0;
          if (pauseAtEnd) player.pause();
        }
      };
      fadeFrame = requestAnimationFrame(step);
    };
    const startAmbient = () => {
      if (!mounted || !gesturedRef.current || !enabledRef.current || document.hidden) return;
      if (!ambientPath) { status("blocked"); return; }
      if (ambient && !ambient.paused) { status("playing"); fade(0.3); return; }
      if (!ambient) {
        ambient = new Audio();
        ambient.preload = "none";
        ambient.loop = true;
        ambient.volume = 0;
        ambient.src = ambientPath;
        ambient.addEventListener("error", () => status(enabledRef.current ? "blocked" : "off"));
      }
      const attempt = ++playAttempt;
      void ambient.play().then(() => {
        if (!mounted || attempt !== playAttempt) return;
        if (!enabledRef.current || document.hidden) { ambient?.pause(); return; }
        status("playing");
        fade(0.3);
      }).catch(() => {
        if (mounted && attempt === playAttempt && enabledRef.current) status("blocked");
      });
    };
    const silence = (immediately: boolean) => {
      playAttempt += 1;
      for (const voice of voices) voice.pause();
      if (immediately) { stopFade(); ambient?.pause(); }
      else fade(0, true);
    };
    const playUi = (kind: keyof typeof paths) => {
      if (!gesturedRef.current || !enabledRef.current || document.hidden || !paths[kind]) return;
      if (!voices.length) voices = Array.from({ length: 4 }, () => {
        const voice = new Audio();
        voice.preload = "none";
        voice.volume = 0.5;
        return voice;
      });
      const voice = voices[voiceIndex++ % voices.length];
      voice.pause();
      voice.src = paths[kind];
      voice.currentTime = 0;
      void voice.play().catch(() => { /* Optional UI sound must never interrupt navigation. */ });
    };
    const activate = (event: Event) => {
      if (!event.isTrusted) return;
      if (event instanceof KeyboardEvent && !["Enter", " "].includes(event.key)) return;
      gesturedRef.current = true;
      startAmbient();
    };
    const control = (target: EventTarget | null) => target instanceof Element
      ? target.closest<HTMLElement>("a,button,[data-sfx]") : null;
    const canSound = (element: HTMLElement | null) => element && !element.matches(":disabled,[aria-disabled='true'],[data-sfx='none']");
    const pointerOver = (event: PointerEvent) => {
      if (!event.isTrusted || !finePointer.matches || event.pointerType !== "mouse") return;
      const element = control(event.target);
      if (canSound(element) && element !== control(event.relatedTarget)) playUi("hover");
    };
    const onClick = (event: MouseEvent) => {
      if (!event.isTrusted) return;
      const element = control(event.target);
      if (canSound(element) && element?.dataset.sfx !== "toggle") playUi("click");
    };
    const visibility = () => {
      if (document.hidden) {
        silence(true);
        status(enabledRef.current ? "armed" : "off");
      } else startAmbient();
    };
    toggleRef.current = (trusted) => {
      if (!trusted) return;
      gesturedRef.current = true;
      if (enabledRef.current) { silence(false); playUi("toggle"); }
      enabledRef.current = !enabledRef.current;
      setEnabled(enabledRef.current);
      try { localStorage.setItem(STORAGE_KEY, String(enabledRef.current)); } catch { /* Private browsing can disable storage. */ }
      if (enabledRef.current) { startAmbient(); playUi("toggle"); }
      else status("off");
    };
    queueMicrotask(() => {
      if (!mounted) return;
      try { enabledRef.current = localStorage.getItem(STORAGE_KEY) !== "false"; } catch { /* Default enabled, awaiting gesture. */ }
      setEnabled(enabledRef.current);
      status(enabledRef.current ? "armed" : "off");
      startAmbient();
    });
    window.addEventListener("pointerdown", activate, { capture: true, passive: true });
    window.addEventListener("keydown", activate, true);
    document.addEventListener("pointerover", pointerOver, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      mounted = false;
      playAttempt += 1;
      stopFade();
      window.removeEventListener("pointerdown", activate, true);
      window.removeEventListener("keydown", activate, true);
      document.removeEventListener("pointerover", pointerOver);
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", visibility);
      for (const player of [ambient, ...voices]) {
        player?.pause();
        player?.removeAttribute("src");
      }
      voices = [];
      toggleRef.current = () => {};
    };
  }, [ambientPath, hover, click, toggle]);

  return <SoundContext.Provider value={{ state, enabled, toggle: (trusted) => toggleRef.current(trusted) }}>
    <div data-sound-state={state} data-sound-enabled={enabled} className="sound-root">{children}</div>
  </SoundContext.Provider>;
}

export function SoundToggle({ label = "Sound", on = "On", off = "Off", pending = "awaiting interaction", className = "" }: {
  label?: string; on?: string; off?: string; pending?: string; className?: string;
}) {
  const sound = useContext(SoundContext);
  if (!sound) return null;
  const status = sound.state === "blocked" ? "playback unavailable" : sound.state === "armed" ? pending : "";
  return <button type="button" className={`sound-toggle ${className}`} data-sfx="toggle"
    aria-pressed={sound.enabled} aria-label={`${label} - ${sound.enabled ? on : off}${status ? `. ${status}` : ""}`}
    onClick={(event) => sound.toggle(event.nativeEvent.isTrusted)}>
    <span>{label} - {sound.enabled ? on : off}</span>
    {status && <span className="sound-status"> ({status})</span>}
  </button>;
}
