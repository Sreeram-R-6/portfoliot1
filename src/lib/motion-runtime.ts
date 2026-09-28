import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Resources = { geometries: number; textures: number; programs: number; frames: number };
type Subscriber = { name: string; element?: HTMLElement; callback: (time: number, delta: number) => void };
const subscribers = new Set<Subscriber>();
const renderers = new Map<string, () => Resources>();
let ticks = 0;
const tick = (time: number, elapsed: number) => {
  if (document.hidden) return;
  ticks++;
  subscribers.forEach(({ element, callback }) => {
    if (element) {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= innerHeight || !element.isConnected) return;
    }
    callback(time, Math.min(elapsed / 1000, .1));
  });
};

declare global {
  interface Window {
    __portfolioMotion?: { read: () => { ticks: number; tickerListeners: number; subscribers: string[]; triggers: { id: string; progress: number; start: number; end: number }[]; renderers: Record<string, Resources> } };
  }
}

function publishDiagnostics() {
  window.__portfolioMotion = { read: () => ({
    ticks,
    tickerListeners: subscribers.size ? 1 : 0,
    subscribers: [...subscribers].map((entry) => entry.name),
    triggers: ScrollTrigger.getAll().map((trigger) => ({ id: String(trigger.vars.id || ""), progress: trigger.progress, start: trigger.start, end: trigger.end })),
    renderers: Object.fromEntries([...renderers].map(([name, read]) => [name, read()])),
  }) };
}

/** Lenis and decorative renderers share GSAP's clock; no second RAF is created. */
export function subscribeFrame(name: string, element: HTMLElement | undefined, callback: Subscriber["callback"]) {
  const entry = { name, element, callback };
  if (!subscribers.size) gsap.ticker.add(tick);
  subscribers.add(entry);
  publishDiagnostics();
  return () => {
    subscribers.delete(entry);
    if (!subscribers.size) gsap.ticker.remove(tick);
  };
}

export function registerRenderer(name: string, read: () => Resources) {
  renderers.set(name, read);
  publishDiagnostics();
  return () => { if (renderers.get(name) === read) renderers.delete(name); };
}
