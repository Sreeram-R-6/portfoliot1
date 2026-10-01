"use client";

import { useEffect, useRef } from "react";
import { registerRenderer, subscribeFrame } from "@/lib/motion-runtime";
import type { CanvasKind } from "./decorative-canvas";

// Original shaders authored for this portfolio from the written behavior spec.
// No shader/source text from the reference bundle is used here.
const vertexSource = `#version 300 es
layout(location = 0) in vec2 corner;
out vec2 coordinate;
void main() {
  coordinate = corner * 0.5 + 0.5;
  gl_Position = vec4(corner, 0.0, 1.0);
}`;

const fragmentSource = `#version 300 es
precision highp float;
uniform sampler2D artwork;
uniform sampler2D nextArtwork;
uniform sampler2D trail;
uniform vec2 dimensions;
uniform float cellWidth;
uniform float crt;
uniform float mixAmount;
uniform float time;
uniform float displace;
uniform float fringe;
uniform float lod;
uniform vec3 ink;
in vec2 coordinate;
out vec4 result;
void main() {
  vec2 centered = coordinate * 2.0 - 1.0;
  vec2 curved = centered * (1.0 + crt * 0.04 * dot(centered, centered));
  vec2 uv = curved * 0.5 + 0.5;
  vec2 feedback = texture(trail, coordinate).rg;
  uv += (feedback - vec2(feedback.y)) * displace / dimensions;
  vec2 pixel = uv * dimensions;
  vec2 cell = (floor(pixel / cellWidth) + 0.5) * cellWidth;
  vec2 sampleUv = mix(cell / dimensions, uv, crt);
  vec4 sampleColor = mix(textureLod(artwork, sampleUv, lod), textureLod(nextArtwork, sampleUv, lod), mixAmount);
  vec2 split = vec2(feedback.x * fringe / dimensions.x, 0.0);
  sampleColor.r = mix(textureLod(artwork, sampleUv + split, lod).r, textureLod(nextArtwork, sampleUv + split, lod).r, mixAmount);
  sampleColor.b = mix(textureLod(artwork, sampleUv - split, lod).b, textureLod(nextArtwork, sampleUv - split, lod).b, mixAmount);
  vec4 bloom = vec4(0.0);
  if (crt > 0.0) {
    // Original radial bloom: verified radius 10, 32 taps, base .3, glow 1.
    for (int tap = 0; tap < 32; tap++) {
      float angle = float(tap) * 2.39996323;
      float radius = 10.0 * sqrt((float(tap) + 0.5) / 32.0);
      vec2 offset = vec2(cos(angle), sin(angle)) * radius / dimensions;
      vec4 light = mix(texture(artwork, sampleUv + offset), texture(nextArtwork, sampleUv + offset), mixAmount);
      bloom += vec4(light.rgb * light.a, light.a) / 32.0;
    }
  }
  vec2 inside = abs(fract(pixel / cellWidth) - 0.5);
  float dotMask = 1.0 - step(0.36, max(inside.x, inside.y));
  float scanMask = mix(1.0, 0.6 + 0.4 * sin(pixel.y * 1.5707963), crt);
  float edge = 1.0 - crt * 0.4 * smoothstep(0.3, 1.4, length(centered));
  float pulse = 1.0 + crt * 0.03 * sin((pixel.y - time * 20.0) / 60.0);
  vec3 color = mix(ink, sampleColor.rgb, crt) * scanMask * edge * pulse;
  color = mix(color, color * 0.3 + bloom.rgb, crt);
  color = mix(color, vec3(144.0 / 255.0, 92.0 / 255.0, 1.0), feedback.x);
  float alpha = max(sampleColor.a, bloom.a) * mix(dotMask, 1.0, crt);
  result = vec4(color * alpha, alpha);
}`;

// Feedback writes into the other attachment; no pass samples its own output.
const trailSource = `#version 300 es
precision highp float;
uniform sampler2D previousTrail;
uniform vec2 mouse;
uniform vec2 previousMouse;
uniform vec2 aspect;
uniform float radius;
uniform float decay;
uniform float pointerGain;
in vec2 coordinate;
out vec4 result;
void main() {
  vec2 p = coordinate * aspect;
  vec2 a = previousMouse * aspect;
  vec2 line = (mouse - previousMouse) * aspect;
  float t = clamp(dot(p - a, line) / max(dot(line, line), 0.000001), 0.0, 1.0);
  float distanceToStroke = length(p - a - t * line);
  float stamp = (1.0 - smoothstep(0.0, radius, distanceToStroke)) * pointerGain;
  vec2 old = texture(previousTrail, coordinate).rg * decay;
  result = vec4(max(old.x, stamp), max(old.y, stamp * length(line)), 0.0, 1.0);
}`;

function makeArtwork(kind: CanvasKind, label: string, width: number, height: number, font: string, letterSpacing: string) {
  const artwork = document.createElement("canvas");
  artwork.width = width;
  artwork.height = height;
  const context = artwork.getContext("2d");
  if (!context) return artwork;
  context.fillStyle = "#fff";
  if (kind === "footer" || kind === "experience") {
    context.font = font;
    context.letterSpacing = letterSpacing;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(label.toUpperCase(), width / 2, height / 2, width);
  } else if (kind === "portrait") {
    // Neutral abstract silhouette; no photograph or personal likeness.
    const glow = context.createLinearGradient(0, 0, width, height);
    glow.addColorStop(0, "#64e8ff");
    glow.addColorStop(0.5, "#905cff");
    glow.addColorStop(1, "#9df133");
    context.fillStyle = glow;
    context.beginPath();
    context.ellipse(width * 0.55, height * 0.34, width * 0.18, height * 0.23, -0.2, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(width * 0.35, height * 0.6);
    context.lineTo(width * 0.8, height * 0.58);
    context.lineTo(width * 0.92, height);
    context.lineTo(width * 0.2, height);
    context.closePath();
    context.fill();
  } else {
    context.translate(width / 2, height / 2);
    context.rotate(Math.PI / 4);
    context.fillRect(-width * 0.2, -height * 0.2, width * 0.4, height * 0.4);
    context.clearRect(-width * 0.1, -height * 0.1, width * 0.2, height * 0.2);
  }
  return artwork;
}

export function OriginalCanvas({ kind, label, onReady }: { kind: CanvasKind; label: string; onReady: (ready: boolean) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const updateArtwork = useRef<((label: string) => void) | null>(null);
  const labelRef = useRef(label);

  useEffect(() => {
    labelRef.current = label;
    updateArtwork.current?.(label);
  }, [label]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Each effect owns its canvas. Development cleanup can release its context
    // without invalidating the next setup on React's retained host element.
    const canvas = document.createElement("canvas");
    canvas.className = "pointer-events-none absolute inset-0 h-full w-full";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    const frame = host.parentElement;
    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) { canvas.remove(); onReady(false); return; }
    const shaders: WebGLShader[] = [];
    const programs: WebGLProgram[] = [];
    const textures: WebGLTexture[] = [];
    const framebuffers: WebGLFramebuffer[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const createProgram = (source: string) => {
      const fragment = compile(gl.FRAGMENT_SHADER, source);
      const program = gl.createProgram();
      if (program) programs.push(program);
      if (!vertex || !fragment || !program) return null;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
    };
    const program = createProgram(fragmentSource);
    const feedbackProgram = createProgram(trailSource);
    const buffer = gl.createBuffer();
    const vao = gl.createVertexArray();
    const createTexture = () => {
      const texture = gl.createTexture();
      if (!texture) return null;
      textures.push(texture);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return texture;
    };
    const artworkTextures = [createTexture(), createTexture()];
    const targets = [0, 1].map(() => {
      const texture = createTexture();
      const framebuffer = gl.createFramebuffer();
      if (framebuffer) framebuffers.push(framebuffer);
      return { texture, framebuffer };
    });
    const dispose = () => {
      shaders.forEach((shader) => gl.deleteShader(shader));
      programs.forEach((value) => gl.deleteProgram(value));
      gl.deleteBuffer(buffer);
      textures.forEach((value) => gl.deleteTexture(value));
      framebuffers.forEach((value) => gl.deleteFramebuffer(value));
      gl.deleteVertexArray(vao);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
    if (!program || !feedbackProgram || !buffer || !vao || artworkTextures.some((value) => !value) || targets.some(({ texture, framebuffer }) => !texture || !framebuffer)) { dispose(); return; }
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, "corner");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    let mounted = true;
    let generation = 0;
    let uploaded = false;
    let firstArtwork = true;
    let currentTexture = 0;
    let mixStart = 0;
    let mixProgress = 1;
    let readTarget = 0;
    let trailWidth = 1;
    let trailHeight = 1;
    let frames = 0;
    let hover = 0;
    let pointerActive = 0;
    const mouse = [0.5, 0.5];
    const desiredMouse = [0.5, 0.5];
    const previousMouse = [0.5, 0.5];
    const bind = (unit: number, texture: WebGLTexture | null) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    };
    const upload = (texture: WebGLTexture | null, artwork: HTMLCanvasElement) => {
      bind(0, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, artwork);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    };
    const paint = (art: HTMLCanvasElement, token: number) => {
      if (!mounted || token !== generation || gl.isContextLost()) return;
      if (firstArtwork) {
        artworkTextures.forEach((texture) => upload(texture, art));
        firstArtwork = false;
        mixProgress = 1;
      } else if (kind === "experience") {
        // The last selected mark becomes the outgoing texture on interruption.
        currentTexture = 1 - currentTexture;
        upload(artworkTextures[1 - currentTexture], art);
        mixStart = performance.now();
        mixProgress = 0;
      } else {
        artworkTextures.forEach((texture) => upload(texture, art));
      }
      uploaded = true;
    };
    const rebuild = (nextLabel: string) => {
      if (!mounted || gl.isContextLost()) return;
      const token = ++generation;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);
      if (canvas.width !== nextWidth || canvas.height !== nextHeight || !uploaded) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        firstArtwork = true;
        uploaded = false;
        let cap = Math.min(kind === "footer" ? 1024 : 512, gl.getParameter(gl.MAX_TEXTURE_SIZE) as number);
        let complete = false;
        while (cap >= 1 && !complete) {
          const scale = Math.min(1, cap / Math.max(nextWidth, nextHeight));
          trailWidth = Math.max(1, Math.round(nextWidth * scale));
          trailHeight = Math.max(1, Math.round(nextHeight * scale));
          complete = targets.every(({ texture, framebuffer }) => {
            bind(0, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, trailWidth, trailHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            const valid = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            return valid;
          });
          cap = Math.floor(cap / 2);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (!complete) { onReady(false); return; }
      }
      const poster = frame?.querySelector<HTMLElement>(".canvas-poster")?.firstElementChild;
      const style = getComputedStyle(poster ?? canvas);
      const font = `${style.fontWeight} ${parseFloat(style.fontSize) * dpr}px ${style.fontFamily}`;
      const color = style.color.match(/[\d.]+/g)?.map(Number);
      gl.useProgram(program);
      gl.uniform3f(gl.getUniformLocation(program, "ink"), (color?.[0] ?? 144) / 255, (color?.[1] ?? 92) / 255, (color?.[2] ?? 255) / 255);
      const portraitImage = kind === "portrait" ? frame?.querySelector<HTMLImageElement>(".canvas-poster [data-portrait-image]") : null;
      const ownPoster = kind === "portrait" || kind === "experience" ? frame?.querySelector(".canvas-poster svg") : null;
      if (portraitImage || ownPoster) {
        const image = new Image();
        image.onload = () => {
          if (!mounted || token !== generation) return;
          const art = document.createElement("canvas");
          art.width = canvas.width;
          art.height = canvas.height;
          const bounds = (portraitImage ?? ownPoster)!.getBoundingClientRect();
          const frame = canvas.getBoundingClientRect();
          const context = art.getContext("2d");
          const x = (bounds.left - frame.left) * dpr;
          const y = (bounds.top - frame.top) * dpr;
          const width = bounds.width * dpr;
          const height = bounds.height * dpr;
          if (portraitImage) {
            const sourceWidth = image.naturalWidth || image.width;
            const sourceHeight = image.naturalHeight || image.height;
            const scale = Math.max(width / sourceWidth, height / sourceHeight);
            const cropWidth = width / scale;
            const cropHeight = height / scale;
            context?.drawImage(image, (sourceWidth - cropWidth) / 2, (sourceHeight - cropHeight) / 2, cropWidth, cropHeight, x, y, width, height);
          } else {
            context?.drawImage(image, x, y, width, height);
          }
          paint(art, token);
        };
        image.src = portraitImage?.currentSrc || portraitImage?.src || `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(ownPoster!))}`;
      } else {
        paint(makeArtwork(kind, nextLabel, canvas.width, canvas.height, font, `${(parseFloat(style.letterSpacing) || 0) * dpr}px`), token);
      }
    };
    updateArtwork.current = rebuild;
    const parent = kind === "portrait" ? canvas.closest<HTMLElement>("[data-section]") : frame;
    const pointer = (event: PointerEvent) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1025px)").matches) return;
      const bounds = canvas.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) { pointerActive = 0; return; }
      desiredMouse[0] = (event.clientX - bounds.left) / bounds.width;
      desiredMouse[1] = 1 - (event.clientY - bounds.top) / bounds.height;
      if (!pointerActive) {
        mouse[0] = previousMouse[0] = desiredMouse[0];
        mouse[1] = previousMouse[1] = desiredMouse[1];
      }
      pointerActive = 1;
    };
    const leave = () => { pointerActive = 0; };
    const unsub = subscribeFrame(`${kind}-canvas`, canvas, (time, delta) => {
      if (!uploaded || gl.isContextLost()) return;
      frames++;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const smoothing = kind === "experience" ? 1 - Math.pow(1 - .09, delta * 60) : 1;
      hover += (pointerActive - hover) * (1 - Math.pow(1 - .12, delta * 60));
      mouse.forEach((_, index) => { mouse[index] += (desiredMouse[index] - mouse[index]) * smoothing; });
      gl.bindVertexArray(vao);
      gl.useProgram(feedbackProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, targets[1 - readTarget].framebuffer);
      gl.viewport(0, 0, trailWidth, trailHeight);
      bind(0, targets[readTarget].texture);
      gl.uniform1i(gl.getUniformLocation(feedbackProgram, "previousTrail"), 0);
      gl.uniform2f(gl.getUniformLocation(feedbackProgram, "mouse"), mouse[0], mouse[1]);
      gl.uniform2f(gl.getUniformLocation(feedbackProgram, "previousMouse"), previousMouse[0], previousMouse[1]);
      gl.uniform2f(gl.getUniformLocation(feedbackProgram, "aspect"), canvas.width / canvas.height, 1);
      gl.uniform1f(gl.getUniformLocation(feedbackProgram, "radius"), kind === "footer" ? .45 : .4);
      gl.uniform1f(gl.getUniformLocation(feedbackProgram, "decay"), Math.pow(.9, delta * 60));
      gl.uniform1f(gl.getUniformLocation(feedbackProgram, "pointerGain"), pointerActive * hover);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      readTarget = 1 - readTarget;
      previousMouse[0] = mouse[0];
      previousMouse[1] = mouse[1];
      if (mixProgress < 1) {
        const t = Math.min(1, (performance.now() - mixStart) / 550);
        mixProgress = t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      }
      gl.useProgram(program);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      bind(0, artworkTextures[currentTexture]);
      bind(1, artworkTextures[1 - currentTexture]);
      bind(2, targets[readTarget].texture);
      gl.uniform1i(gl.getUniformLocation(program, "artwork"), 0);
      gl.uniform1i(gl.getUniformLocation(program, "nextArtwork"), 1);
      gl.uniform1i(gl.getUniformLocation(program, "trail"), 2);
      gl.uniform2f(gl.getUniformLocation(program, "dimensions"), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(program, "cellWidth"), (kind === "footer" ? 9 : 4) * dpr);
      gl.uniform1f(gl.getUniformLocation(program, "crt"), kind === "footer" ? 0 : 1);
      gl.uniform1f(gl.getUniformLocation(program, "mixAmount"), mixProgress);
      gl.uniform1f(gl.getUniformLocation(program, "time"), time);
      gl.uniform1f(gl.getUniformLocation(program, "displace"), kind === "footer" ? .5 : 18 * dpr);
      gl.uniform1f(gl.getUniformLocation(program, "fringe"), kind === "footer" ? 0 : 2.2);
      gl.uniform1f(gl.getUniformLocation(program, "lod"), kind === "footer" ? Math.max(0, Math.log2(Math.max(1, .7 * 9 * dpr))) : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.dataset.mix = mixProgress.toFixed(3);
      canvas.dataset.frames = String(frames);
      onReady(true);
    });
    const unregister = registerRenderer(`${kind}-canvas`, () => ({ geometries: 0, textures: textures.length, programs: programs.length, frames }));
    const lost = (event: Event) => { event.preventDefault(); uploaded = false; canvas.hidden = true; onReady(false); };
    const resized = new ResizeObserver(() => rebuild(labelRef.current));
    resized.observe(canvas);
    canvas.addEventListener("webglcontextlost", lost);
    parent?.addEventListener("pointermove", pointer);
    parent?.addEventListener("pointerleave", leave);
    document.fonts.ready.then(() => rebuild(labelRef.current));
    rebuild(labelRef.current);
    return () => {
      mounted = false;
      updateArtwork.current = null;
      unsub();
      unregister();
      resized.disconnect();
      parent?.removeEventListener("pointermove", pointer);
      parent?.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", lost);
      dispose();
    };
  }, [kind, onReady]);

  return <div ref={hostRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
