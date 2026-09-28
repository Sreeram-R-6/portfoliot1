"use client";

import { useEffect, useRef } from "react";
import type { CanvasKind } from "./decorative-canvas";

// Original shaders authored for this portfolio from the written behavior spec.
// No shader/source text from the reference bundle is used here.
const vertexSource = `#version 300 es
in vec2 corner;
out vec2 coordinate;
void main() {
  coordinate = corner * 0.5 + 0.5;
  gl_Position = vec4(corner, 0.0, 1.0);
}`;

const fragmentSource = `#version 300 es
precision highp float;
uniform sampler2D artwork;
uniform vec2 dimensions;
uniform float cellWidth;
uniform float crt;
uniform vec3 ink;
in vec2 coordinate;
out vec4 result;
void main() {
  vec2 centered = coordinate * 2.0 - 1.0;
  vec2 curved = centered * (1.0 + crt * 0.04 * dot(centered, centered));
  vec2 uv = curved * 0.5 + 0.5;
  vec2 pixel = uv * dimensions;
  vec2 cell = (floor(pixel / cellWidth) + 0.5) * cellWidth;
  vec4 sampleColor = texture(artwork, cell / dimensions);
  vec2 inside = abs(fract(pixel / cellWidth) - 0.5);
  float dotMask = 1.0 - step(0.36, max(inside.x, inside.y));
  float scanMask = mix(1.0, 0.6 + 0.4 * sin(pixel.y * 1.5707963), crt);
  float edge = 1.0 - crt * 0.4 * smoothstep(0.3, 1.4, length(centered));
  vec3 color = mix(ink, sampleColor.rgb, crt) * scanMask * edge;
  float alpha = sampleColor.a * dotMask;
  result = vec4(color * alpha, alpha);
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    const vao = gl.createVertexArray();
    const dispose = () => {
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteVertexArray(vao);
    };
    if (!vertex || !fragment || !program || !buffer || !texture || !vao) { dispose(); return; }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return; }
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, "corner");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, "artwork"), 0);
    gl.uniform1f(gl.getUniformLocation(program, "crt"), kind === "portrait" || kind === "experience" ? 1 : 0);
    gl.uniform3f(gl.getUniformLocation(program, "ink"), kind === "footer" ? 7 / 255 : 144 / 255, kind === "footer" ? 2 / 255 : 92 / 255, kind === "footer" ? 16 / 255 : 1);
    let mounted = true;
    const draw = () => {
      if (!mounted || gl.isContextLost()) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const poster = canvas.parentElement?.querySelector<HTMLElement>(".canvas-poster")?.firstElementChild;
      const style = getComputedStyle(poster ?? canvas);
      const font = `${style.fontWeight} ${parseFloat(style.fontSize) * dpr}px ${style.fontFamily}`;
      const paint = (art: HTMLCanvasElement) => {
        if (!mounted || gl.isContextLost()) return;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, art);
        gl.uniform2f(gl.getUniformLocation(program, "dimensions"), canvas.width, canvas.height);
        gl.uniform1f(gl.getUniformLocation(program, "cellWidth"), (kind === "footer" ? 9 : kind === "glyph" ? 6 : 4) * dpr);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        onReady(true);
      };
      const ownPoster = kind === "portrait" || kind === "experience" ? canvas.parentElement?.querySelector(".canvas-poster svg") : null;
      if (ownPoster) {
        const image = new Image();
        image.onload = () => {
          if (!mounted) return;
          const art = document.createElement("canvas");
          art.width = canvas.width;
          art.height = canvas.height;
          const bounds = ownPoster.getBoundingClientRect();
          const frame = canvas.getBoundingClientRect();
          art.getContext("2d")?.drawImage(image, (bounds.left - frame.left) * dpr, (bounds.top - frame.top) * dpr, bounds.width * dpr, bounds.height * dpr);
          paint(art);
        };
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(ownPoster))}`;
      } else {
        paint(makeArtwork(kind, label, canvas.width, canvas.height, font, `${(parseFloat(style.letterSpacing) || 0) * dpr}px`));
      }
    };
    const lost = (event: Event) => { event.preventDefault(); canvas.hidden = true; onReady(false); };
    const resized = new ResizeObserver(draw);
    resized.observe(canvas);
    canvas.addEventListener("webglcontextlost", lost);
    document.fonts.ready.then(draw);
    draw();
    return () => {
      mounted = false;
      resized.disconnect();
      canvas.removeEventListener("webglcontextlost", lost);
      dispose();
      // Release allocations explicitly. Forcing context loss here would also
      // invalidate the canvas React reuses during its development effect check.
    };
  }, [kind, label, onReady]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
