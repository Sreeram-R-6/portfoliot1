"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot, extend, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { subscribeFrame, registerRenderer } from "@/lib/motion-runtime";
import { CanvasTexture, Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, SRGBColorSpace, Vector2, Vector4, WebGLRenderer, WebGLRenderTarget } from "three";

extend({ Mesh, PlaneGeometry, ShaderMaterial });

// Original implementation of the verified sweep inputs; neutral artwork and
// shader math are deliberate approximations, not extracted upstream source.
const vertex = `
varying vec2 imageCoordinate;
void main() {
  imageCoordinate = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const fragment = `
uniform sampler2D artwork;
uniform float magnification;
uniform float progress;
uniform float reverse;
uniform vec2 size;
uniform sampler2D trail;
uniform vec4 trailRect;
uniform vec3 bandColor;
varying vec2 imageCoordinate;
void main() {
  vec2 trailPoint = trailRect.xy + imageCoordinate * trailRect.zw;
  vec2 motion = texture2D(trail, trailPoint).rg * 2.0 - 1.0;
  float strength = texture2D(trail, trailPoint).b;
  vec2 displacement = motion * strength * 22.0 / size;
  float sweep = mix(imageCoordinate.x, 1.0 - imageCoordinate.x, reverse);
  float row = floor(imageCoordinate.y * size.y / 26.0);
  float jitter = fract(sin(row * 26.0) * 26.0) * .40;
  float front = progress * (1.0 + .250 + .40) - jitter;
  float reveal = step(sweep, front);
  float block = mix(26.0, 1.0, smoothstep(0.0, .700, progress));
  vec2 pixels = max(vec2(1.0), size / block);
  vec2 samplePoint = (floor(imageCoordinate * pixels) + .5) / pixels;
  samplePoint = (samplePoint - .5) / magnification + .5 + displacement;
  vec4 image = texture2D(artwork, samplePoint);
  vec2 fringe = displacement * 2.2;
  image.r = texture2D(artwork, samplePoint + fringe).r;
  image.b = texture2D(artwork, samplePoint - fringe).b;
  float band = step(front - .250, sweep) * step(sweep, front);
  float core = step(front - .050, sweep) * step(sweep, front);
  image.rgb = mix(image.rgb, bandColor, band * .500 + core * .500);
  image.rgb = mix(image.rgb, bandColor, strength * .180);
  gl_FragColor = vec4(image.rgb, image.a * reveal);
  #include <colorspace_fragment>
}`;

const trailFragment = `
uniform sampler2D previous;
uniform vec2 pointer;
uniform vec2 lastPointer;
uniform vec2 resolution;
uniform float pointerActive;
varying vec2 imageCoordinate;
void main() {
  vec3 old = texture2D(previous, imageCoordinate).rgb;
  vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
  vec2 a = (imageCoordinate - lastPointer) * aspect;
  vec2 b = (pointer - lastPointer) * aspect;
  float along = clamp(dot(a, b) / max(dot(b, b), .000001), 0.0, 1.0);
  float distanceToStroke = length(a - b * along);
  float intensity = max(0.0, 1.0 - distanceToStroke / .25) * pointerActive;
  vec2 direction = normalize(b + vec2(.000001));
  gl_FragColor = vec4(mix(old.rg, direction * .5 + .5, intensity), max(old.b * .9, intensity), 1.0);
}`;

type ProjectTrail = { read: WebGLRenderTarget; write: WebGLRenderTarget; scene: Scene; camera: OrthographicCamera; material: ShaderMaterial; pointer: Vector2; previous: Vector2; active: boolean };

function drawTrail(trail: ProjectTrail, canvas: HTMLCanvasElement, gl: WebGLRenderer) {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(1, 512 / Math.max(bounds.width, bounds.height));
    const width = Math.max(1, Math.round(bounds.width * ratio)), height = Math.max(1, Math.round(bounds.height * ratio));
    if (trail.read.width !== width || trail.read.height !== height) { trail.read.setSize(width, height); trail.write.setSize(width, height); }
    trail.material.uniforms.previous.value = trail.read.texture;
    trail.material.uniforms.pointer.value.copy(trail.pointer);
    trail.material.uniforms.lastPointer.value.copy(trail.previous);
    trail.material.uniforms.resolution.value.set(width, height);
    trail.material.uniforms.pointerActive.value = Number(trail.active && !trail.pointer.equals(trail.previous));
    const previousTarget = gl.getRenderTarget();
    gl.setRenderTarget(trail.write); gl.render(trail.scene, trail.camera); gl.setRenderTarget(previousTarget);
    [trail.read, trail.write] = [trail.write, trail.read];
    trail.previous.copy(trail.pointer);
}

type ImagePlane = { element: HTMLElement; texture: CanvasTexture };

function ProjectPlane({ entry, canvas, order, trail }: { entry: ImagePlane; canvas: HTMLCanvasElement; order: number; trail: ProjectTrail }) {
  const ref = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null);
  const animation = useRef({ zoom: 1, progress: 0, reverse: 0, lastScroll: 0 });
  const uniforms = useMemo(() => ({ artwork: { value: entry.texture }, magnification: { value: 1 }, progress: { value: 0 }, reverse: { value: 0 }, size: { value: new Vector2(1, 1) }, trail: { value: trail.read.texture }, trailRect: { value: new Vector4(0, 0, 1, 1) }, bandColor: { value: new Color("#C02DFF") } }), [entry.texture, trail]);
  useEffect(() => {
    const state = animation.current;
    const zoom = (value: number) => gsap.to(state, { zoom: value, duration: .6, ease: "power4.out", overwrite: true });
    const enter = () => { zoom(1.04); };
    const leave = () => { zoom(1); };
    const thumb = entry.element;
    thumb.addEventListener("pointerenter", enter); thumb.addEventListener("pointerleave", leave);
    thumb.addEventListener("focus", enter); thumb.addEventListener("blur", leave);
    return () => { gsap.killTweensOf(state); thumb.removeEventListener("pointerenter", enter); thumb.removeEventListener("pointerleave", leave); thumb.removeEventListener("focus", enter); thumb.removeEventListener("blur", leave); };
  }, [entry.element]);
  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const surface = canvas.getBoundingClientRect();
    const rectangle = entry.element.getBoundingClientRect();
    mesh.position.set(rectangle.left - surface.left + rectangle.width / 2 - surface.width / 2, surface.height / 2 - (rectangle.top - surface.top + rectangle.height / 2), 0);
    mesh.scale.set(rectangle.width, rectangle.height, 1);
    const state = animation.current;
    if (rectangle.right > 0 && rectangle.left < .95 * innerWidth && rectangle.bottom > 0 && rectangle.top < innerHeight) {
      if (!state.progress) state.reverse = Number((document.getElementById("scroll-container")?.scrollTop ?? window.scrollY) < state.lastScroll);
      state.progress = Math.min(1, state.progress + delta / .8);
    } else state.progress = 0;
    state.lastScroll = document.getElementById("scroll-container")?.scrollTop ?? window.scrollY;
    mesh.material.uniforms.magnification.value = state.zoom;
    mesh.material.uniforms.progress.value = state.progress;
    mesh.material.uniforms.reverse.value = state.reverse;
    mesh.material.uniforms.size.value.set(rectangle.width, rectangle.height);
    mesh.material.uniforms.trail.value = trail.read.texture;
    mesh.material.uniforms.trailRect.value.set((rectangle.left - surface.left) / surface.width, 1 - (rectangle.bottom - surface.top) / surface.height, rectangle.width / surface.width, rectangle.height / surface.height);
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
  const gl = useThree((state) => state.gl);
  const trail = useMemo<ProjectTrail>(() => {
    const read = new WebGLRenderTarget(1, 1), write = new WebGLRenderTarget(1, 1);
    const material = new ShaderMaterial({ vertexShader: vertex, fragmentShader: trailFragment, uniforms: { previous: { value: read.texture }, pointer: { value: new Vector2(-1, -1) }, lastPointer: { value: new Vector2(-1, -1) }, resolution: { value: new Vector2(1, 1) }, pointerActive: { value: 0 } }, depthTest: false, depthWrite: false });
    const scene = new Scene(); scene.add(new Mesh(new PlaneGeometry(2, 2), material));
    return { read, write, scene, camera: new OrthographicCamera(-1, 1, 1, -1, 0, 1), material, pointer: new Vector2(-1, -1), previous: new Vector2(-1, -1), active: false };
  }, []);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!matchMedia("(hover: hover)").matches) return;
      const bounds = canvas.getBoundingClientRect();
      trail.pointer.set((event.clientX - bounds.left) / bounds.width, 1 - (event.clientY - bounds.top) / bounds.height);
      trail.active = true;
    };
    const leave = () => { trail.active = false; };
    section.addEventListener("pointermove", move); section.addEventListener("pointerleave", leave);
    const unsubscribe = subscribeFrame("projects", section, () => invalidate());
    const unregister = registerRenderer("projects", () => ({ geometries: gl.info.memory.geometries, textures: gl.info.memory.textures, programs: gl.info.programs?.length || 0, frames: gl.info.render.frame }));
    return () => {
      unsubscribe(); unregister(); section.removeEventListener("pointermove", move); section.removeEventListener("pointerleave", leave);
      trail.scene.children.forEach((child) => { if (child instanceof Mesh) child.geometry.dispose(); });
      trail.material.dispose(); trail.read.dispose(); trail.write.dispose();
    };
  }, [canvas, section, trail, gl, invalidate]);
  useFrame(() => {
    drawTrail(trail, canvas, gl);
  }, -1);

  useEffect(() => {
    let mounted = true;
    const textures: CanvasTexture[] = [];
    const thumbs = [...section.querySelectorAll<HTMLElement>("[data-project-thumb]")];
    const load = async (element: HTMLElement): Promise<ImagePlane> => {
      const svg = element.querySelector<SVGSVGElement>("[data-project-poster]");
      const uploaded = element.querySelector<HTMLImageElement>("[data-project-image]");
      if (!svg && !uploaded) throw new Error("Missing project artwork");
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve(); image.onerror = () => reject(new Error("Original poster could not be rasterized"));
        if (uploaded) { image.crossOrigin = "anonymous"; image.src = uploaded.currentSrc || uploaded.src; }
        else image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg!))}`;
      });
      const art = document.createElement("canvas");
      const bounds = element.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      art.width = Math.max(1, Math.round(bounds.width * dpr)); art.height = Math.max(1, Math.round(bounds.height * dpr));
      const context = art.getContext("2d");
      if (uploaded) {
        const scale = Math.max(art.width / image.width, art.height / image.height);
        const width = art.width / scale, height = art.height / scale;
        context?.drawImage(image, (image.width - width) / 2, (image.height - height) / 2, width, height, 0, 0, art.width, art.height);
      } else context?.drawImage(image, 0, 0, art.width, art.height);
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
  return entries.map((entry, index) => <ProjectPlane key={entry.element.getAttribute("aria-labelledby")} entry={entry} canvas={canvas} order={index} trail={trail} />);
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
