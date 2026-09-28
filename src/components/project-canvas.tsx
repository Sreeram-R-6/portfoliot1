"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot, extend, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, Mesh, PlaneGeometry, ShaderMaterial, SRGBColorSpace, WebGLRenderer } from "three";

extend({ Mesh, PlaneGeometry, ShaderMaterial });

// Original image-plane shader. Sweep/feedback passes are added in Phase 5.
const vertex = `
varying vec2 imageCoordinate;
void main() {
  imageCoordinate = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const fragment = `
uniform sampler2D artwork;
uniform float magnification;
varying vec2 imageCoordinate;
void main() {
  vec2 samplePoint = (imageCoordinate - 0.5) / magnification + 0.5;
  gl_FragColor = texture2D(artwork, samplePoint);
  #include <colorspace_fragment>
}`;

type ImagePlane = { element: HTMLElement; texture: CanvasTexture };

function ProjectPlane({ entry, canvas, order }: { entry: ImagePlane; canvas: HTMLCanvasElement; order: number }) {
  const ref = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null);
  const uniforms = useMemo(() => ({ artwork: { value: entry.texture }, magnification: { value: 1 } }), [entry.texture]);
  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const surface = canvas.getBoundingClientRect();
    const rectangle = entry.element.getBoundingClientRect();
    mesh.position.set(rectangle.left - surface.left + rectangle.width / 2 - surface.width / 2, surface.height / 2 - (rectangle.top - surface.top + rectangle.height / 2), 0);
    mesh.scale.set(rectangle.width, rectangle.height, 1);
    mesh.material.uniforms.magnification.value = entry.element.matches(":hover, :focus-visible") ? 1.04 : 1;
  });
  return (
    <mesh ref={ref} renderOrder={order} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthTest={false} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function ProjectPlanes({ canvas, section, onReady }: { canvas: HTMLCanvasElement; section: HTMLElement; onReady: (value: boolean) => void }) {
  const [entries, setEntries] = useState<ImagePlane[]>([]);
  const invalidate = useThree((state) => state.invalidate);
  const ready = useRef(false);

  useEffect(() => {
    let mounted = true;
    const textures: CanvasTexture[] = [];
    const thumbs = [...section.querySelectorAll<HTMLElement>("[data-project-thumb]")];
    const load = async (element: HTMLElement): Promise<ImagePlane> => {
      const svg = element.querySelector<SVGSVGElement>("[data-project-poster]");
      if (!svg) throw new Error("Missing original project poster");
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve(); image.onerror = () => reject(new Error("Original poster could not be rasterized"));
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;
      });
      const art = document.createElement("canvas");
      const bounds = element.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      art.width = Math.max(1, Math.round(bounds.width * dpr)); art.height = Math.max(1, Math.round(bounds.height * dpr));
      art.getContext("2d")?.drawImage(image, 0, 0, art.width, art.height);
      const texture = new CanvasTexture(art); texture.colorSpace = SRGBColorSpace;
      if (!mounted) texture.dispose(); else textures.push(texture);
      return { element, texture };
    };
    Promise.all(thumbs.map(load)).then((loaded) => {
      if (mounted) { setEntries(loaded); invalidate(); }
    }).catch(() => { if (mounted) onReady(false); });
    const refresh = () => invalidate();
    const observer = new ResizeObserver(refresh);
    thumbs.forEach((thumb) => observer.observe(thumb)); observer.observe(section);
    const eventNames = ["scroll", "pointerover", "pointerout", "focusin", "focusout"] as const;
    eventNames.forEach((name) => section.addEventListener(name, refresh, true));
    return () => {
      mounted = false; observer.disconnect(); textures.forEach((texture) => texture.dispose());
      eventNames.forEach((name) => section.removeEventListener(name, refresh, true));
    };
  }, [section, invalidate, onReady]);

  useFrame(() => {
    if (entries.length && !ready.current) {
      ready.current = true;
      queueMicrotask(() => { if (canvas.isConnected) onReady(true); });
    }
  });
  return entries.map((entry, index) => <ProjectPlane key={entry.element.getAttribute("aria-labelledby")} entry={entry} canvas={canvas} order={index} />);
}

/** One shared Fiber root for all five thumbnails, rendered only on demand. */
export function ProjectCanvas({ onReady }: { onReady: (value: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    const section = host?.closest<HTMLElement>("[data-section]");
    if (!host || !section) return;
    // Each mount owns a fresh canvas, so delayed Fiber disposal cannot touch a
    // canvas reused by React's development effect check.
    const canvas = document.createElement("canvas");
    canvas.className = "block h-full w-full"; canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    const context = canvas.getContext("webgl2", { alpha: true, antialias: false });
    if (!context) { canvas.remove(); onReady(false); return; }
    const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: false });
    renderer.setClearColor(0, 0);
    const root = createRoot(canvas);
    let mounted = true;
    let configured = false;
    const configure = async () => {
      const bounds = host.getBoundingClientRect();
      if (!mounted || !bounds.width || !bounds.height) return;
      await root.configure({ gl: renderer, orthographic: true, camera: { position: [0, 0, 100], near: .1, far: 1000 }, size: { width: bounds.width, height: bounds.height, top: 0, left: 0 }, dpr: [1, 2], frameloop: "demand", flat: true });
      if (!mounted) return;
      if (!configured) { configured = true; root.render(<ProjectPlanes canvas={canvas} section={section} onReady={onReady} />); }
    };
    const refresh = () => { configure().catch(() => { if (mounted) onReady(false); }); };
    const observer = new ResizeObserver(refresh); observer.observe(host);
    const lost = (event: Event) => { event.preventDefault(); canvas.hidden = true; onReady(false); };
    canvas.addEventListener("webglcontextlost", lost); refresh();
    return () => {
      mounted = false; observer.disconnect(); canvas.removeEventListener("webglcontextlost", lost);
      onReady(false); root.unmount(); renderer.dispose(); canvas.remove();
    };
  }, [onReady]);
  return <div ref={ref} className="absolute inset-0" />;
}
