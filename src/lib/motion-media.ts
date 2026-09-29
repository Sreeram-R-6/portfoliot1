import { gsap } from "gsap";

/** Own the native query subscription for exactly as long as its animations. */
export function createMotionMedia() {
  const cleanups: (() => void)[] = [];
  return {
    add(query: string, setup: (context: gsap.Context) => void | (() => void)) {
      const media = window.matchMedia(query);
      let context: gsap.Context | undefined;
      const update = () => {
        context?.revert();
        context = media.matches ? gsap.context(setup) : undefined;
      };
      media.addEventListener("change", update);
      update();
      cleanups.push(() => {
        media.removeEventListener("change", update);
        context?.revert();
        context = undefined;
      });
    },
    revert() {
      cleanups.splice(0).forEach((cleanup) => cleanup());
    },
  };
}
