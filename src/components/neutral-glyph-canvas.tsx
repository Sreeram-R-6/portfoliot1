"use client";

import { useEffect, useRef } from "react";
import { ExtrudeGeometry, GLSL3, Mesh, NoBlending, OrthographicCamera, Path, PerspectiveCamera, PlaneGeometry, RawShaderMaterial, Scene, Shape, SRGBColorSpace, Vector2, WebGLRenderer, WebGLRenderTarget } from "three";

const geometryVertex = `in vec3 position;
in vec3 normal;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
out vec3 positionInWorld;
out vec3 normalInWorld;
void main() {
  positionInWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  normalInWorld = mat3(modelMatrix) * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const geometryFragment = `precision highp float;
in vec3 positionInWorld;
in vec3 normalInWorld;
out vec4 color;
void main() {
  vec3 normal = normalize(normalInWorld);
  vec3 light = normalize(vec3(0.6, 0.8, 0.9));
  vec3 view = normalize(vec3(0.0, 0.0, 6.2) - positionInWorld);
  float diffuse = max(dot(normal, light), 0.0);
  float gloss = pow(max(dot(reflect(-light, normal), view), 0.0), 48.0);
  float rim = pow(1.0 - max(dot(normal, view), 0.0), 2.6);
  vec3 accent = vec3(182.0, 242.0, 0.0) / 255.0;
  color = vec4(accent * (0.2 + 0.65 * diffuse) + vec3(gloss + rim * 0.3), 1.0);
}`;

const postVertex = `in vec3 position;
out vec2 uv;
void main() { uv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const postFragment = `precision highp float;
uniform sampler2D sceneImage;
uniform vec2 extent;
in vec2 uv;
out vec4 color;
void main() {
  vec2 cell = (floor(uv * extent / 6.0) + 0.5) * 6.0 / extent;
  vec2 fringe = (cell - 0.5) * 0.2035 * 6.0 / extent;
  vec4 source = texture(sceneImage, cell);
  float red = texture(sceneImage, cell + fringe).a;
  float blue = texture(sceneImage, cell - fringe).a;
  float luminance = dot(source.rgb, vec3(0.2126, 0.7152, 0.0722));
  float stripe = step(fract(gl_FragCoord.x / 6.0), clamp(luminance, 0.15, 0.85));
  float alpha = max(source.a, max(red, blue)) * stripe;
  vec3 ink = vec3(155.0, 92.0, 255.0) / 255.0;
  vec3 separated = ink * vec3(red, source.a, blue);
  color = vec4(separated * stripe, alpha);
}`;

/** Original neutral geometry and GLSL; Phase 5 connects time/scroll inputs. */
export function NeutralGlyphCanvas({ onReady }: { onReady: (value: boolean) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: true });
    if (!context) return;
    const renderer = new WebGLRenderer({ canvas, context, alpha: true, premultipliedAlpha: false, antialias: true });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0, 0);
    const camera = new PerspectiveCamera(35, 1, .1, 100);
    camera.position.z = 6.2;
    const shape = new Shape();
    shape.moveTo(-86, -86); shape.lineTo(86, -86); shape.lineTo(86, 86); shape.lineTo(-86, 86); shape.closePath();
    const hole = new Path();
    hole.moveTo(-56, -56); hole.lineTo(-56, 56); hole.lineTo(56, 56); hole.lineTo(56, -56); hole.closePath();
    shape.holes.push(hole);
    const geometry = new ExtrudeGeometry(shape, { depth: 14, bevelEnabled: true, bevelSize: 1.4, bevelThickness: 1.4, bevelSegments: 3, curveSegments: 24 });
    geometry.center();
    geometry.scale(2.6 / 174.8, 2.6 / 174.8, 2.6 / 174.8);
    const material = new RawShaderMaterial({ vertexShader: geometryVertex, fragmentShader: geometryFragment, glslVersion: GLSL3 });
    const mesh = new Mesh(geometry, material);
    mesh.rotation.y = .52;
    const scene = new Scene(); scene.add(mesh);
    const target = new WebGLRenderTarget(1, 1);
    const quadGeometry = new PlaneGeometry(2, 2);
    const extent = new Vector2();
    const quadMaterial = new RawShaderMaterial({
      vertexShader: postVertex, fragmentShader: postFragment, glslVersion: GLSL3,
      uniforms: { sceneImage: { value: target.texture }, extent: { value: extent } },
      depthTest: false, depthWrite: false, blending: NoBlending,
    });
    const post = new Scene(); post.add(new Mesh(quadGeometry, quadMaterial));
    const postCamera = new OrthographicCamera(-1, 1, 1, -1, .1, 1);
    let mounted = true;
    const draw = () => {
      if (!mounted || context.isContextLost()) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr); renderer.setSize(rect.width, rect.height, false);
      target.setSize(Math.round(rect.width * dpr), Math.round(rect.height * dpr));
      extent.set(target.width, target.height);
      camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix();
      renderer.setRenderTarget(target); renderer.clear(); renderer.render(scene, camera);
      renderer.setRenderTarget(null); renderer.clear(); renderer.render(post, postCamera);
      onReady(true);
    };
    const lost = (event: Event) => { event.preventDefault(); canvas.hidden = true; onReady(false); };
    const observer = new ResizeObserver(draw); observer.observe(canvas);
    canvas.addEventListener("webglcontextlost", lost); draw();
    return () => {
      mounted = false; observer.disconnect(); canvas.removeEventListener("webglcontextlost", lost);
      scene.clear(); post.clear(); geometry.dispose(); material.dispose(); quadGeometry.dispose(); quadMaterial.dispose(); target.dispose(); renderer.dispose();
    };
  }, [onReady]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
