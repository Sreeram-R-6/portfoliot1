"use client";

import { useRef, useState, type ChangeEvent } from "react";
import type { SiteContent } from "@/content/site";
import { fieldKind, isSiteContent, isTodo, validateDetails, type ContentValue, type FieldIssue } from "@/content/details-schema";
import "./details-editor.css";

const groups = [
  { id: "profile", label: "Profile / identity", paths: ["name", "role", "location", "orientation", "navigation", "sections.identity", "todos"] },
  { id: "contact", label: "Contact / social links", paths: ["footer.message", "footer.cv", "footer.links", "footer.locationHref"] },
  { id: "manifesto", label: "Manifesto", paths: ["sections.manifesto"] },
  { id: "statistics", label: "Statistics / tools", paths: ["sections.statistics"] },
  { id: "projects", label: "Projects", paths: ["sections.projects", "projects"] },
  { id: "experience", label: "Experience", paths: ["sections.experience"] },
  { id: "footer", label: "Footer", paths: ["footer.id", "footer.eyebrow", "footer.title", "footer.groupLabels"] },
  { id: "seo", label: "SEO / meta", paths: ["metadata"] },
];

function valueAt(root: ContentValue, path: string): ContentValue {
  return path.split(".").reduce<ContentValue>((value, key) => (value as Record<string, ContentValue>)[key], root);
}

function replaceAt(root: ContentValue, path: string, value: ContentValue): ContentValue {
  const copy = structuredClone(root);
  const keys = path.split(".");
  const parent = keys.slice(0, -1).reduce<ContentValue>((item, key) => (item as Record<string, ContentValue>)[key], copy);
  (parent as Record<string, ContentValue>)[keys.at(-1)!] = value;
  return copy;
}

function newListItem(path: string, values: ContentValue[]): ContentValue {
  const id = `item-${crypto.randomUUID()}`;
  if (path === "projects") return { id, title: "TODO", description: "TODO", href: "TODO", image: null, todo: "TODO: project link and own image" };
  if (path === "sections.experience.entries") return { id, index: String(values.length + 1).padStart(2, "0"), title: "TODO", role: "TODO", description: "TODO" };
  if (["footer.links", "navigation.links"].includes(path)) return { label: "TODO", href: "TODO" };
  return "TODO";
}

type FieldProps = { value: ContentValue; path: string; errors: FieldIssue[]; change: (path: string, value: ContentValue) => void };

function ContentField({ value, path, errors, change }: FieldProps) {
  const [uploadStatus, setUploadStatus] = useState("");
  const kind = fieldKind(path);
  const messages = errors.filter((error) => error.path === path);
  const id = `field-${path}`;
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setUploadStatus("Error: file exceeds 5 MB."); event.target.value = ""; return; }
    setUploadStatus("Uploading...");
    try {
      const body = new FormData(); body.set("file", file); body.set("kind", kind === "cv" ? "cv" : "image");
      const response = await fetch("/api/details/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || typeof result.path !== "string") throw new Error(result.error || "Upload failed.");
      change(path, result.path); setUploadStatus("Uploaded. Press Save to keep this path.");
    } catch (error) { setUploadStatus(error instanceof Error ? error.message : "Upload failed."); }
    event.target.value = "";
  }
  if (Array.isArray(value)) return (
    <fieldset className="details-list" id={id}>
      <legend>{path}</legend>
      {messages.map((error) => <p className="details-error" key={error.message}>{error.message}</p>)}
      {value.map((item, index) => (
        <div className="details-list-item" key={`${path}.${index}`}>
          <div className="details-list-actions">
            <span>Item {index + 1}</span>
            <button type="button" aria-label={`${path}.${index}: Move up`} disabled={!index} onClick={() => { const next = [...value]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; change(path, next); }}>Up</button>
            <button type="button" aria-label={`${path}.${index}: Move down`} disabled={index === value.length - 1} onClick={() => { const next = [...value]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; change(path, next); }}>Down</button>
            <button type="button" aria-label={`${path}.${index}: Delete`} onClick={() => change(path, value.filter((_, order) => order !== index))}>Delete</button>
          </div>
          <ContentField value={item} path={`${path}.${index}`} errors={errors} change={change} />
        </div>
      ))}
      <button type="button" onClick={() => change(path, [...value, newListItem(path, value)])}>Add {path}</button>
    </fieldset>
  );
  if (value !== null && typeof value === "object") return (
    <fieldset className="details-object" id={id}>
      <legend>{path}</legend>
      <div className="details-fields">{Object.entries(value).map(([key, item]) => <ContentField key={key} value={item} path={`${path}.${key}`} errors={errors} change={change} />)}</div>
    </fieldset>
  );
  const text = value ?? "";
  const todo = isTodo(value);
  const describedBy = messages.length ? `${id}-error` : undefined;
  return (
    <div className={`details-field ${kind === "textarea" ? "details-wide" : ""}`}>
      <label htmlFor={id}>{path}{todo && <span className="details-todo"> TODO</span>}</label>
      {kind === "textarea" ? <textarea id={id} aria-label={path} value={text} aria-invalid={!!messages.length} aria-describedby={describedBy} onChange={(event) => change(path, event.target.value)} rows={3} /> : (
        <div className="details-input-row">
          <input id={id} aria-label={path} type={kind === "number" && !todo ? "number" : "text"} min={kind === "number" ? 0 : undefined} step={kind === "number" ? "any" : undefined} inputMode={kind === "number" ? "decimal" : kind === "url" ? "url" : undefined} value={text} aria-invalid={!!messages.length} aria-describedby={describedBy} onChange={(event) => change(path, event.target.value)} />
          {kind === "number" && <button type="button" onClick={() => change(path, "TODO")} aria-label={`${path}: Mark TODO`}>TODO</button>}
          {kind === "image" && <button type="button" onClick={() => change(path, null)} aria-label={`${path}: Clear image`}>Clear</button>}
        </div>
      )}
      {messages.length > 0 && <div id={`${id}-error`} className="details-error">{messages.map((error) => <p key={error.message}>{error.message}</p>)}</div>}
      {(kind === "image" || kind === "cv") && <>
        <label className="details-upload">Upload {kind === "cv" ? "PDF CV" : "image"} (max 5 MB)<input type="file" aria-label={`Upload ${path}`} accept={kind === "cv" ? ".pdf,application/pdf" : ".png,.jpg,.jpeg,.webp,.svg"} onChange={upload} /></label>
        <p role="status">{uploadStatus}</p>
        {kind === "image" && typeof value === "string" && !todo && !messages.length && (
          // Native image previews accept newly uploaded SVGs without an optimization service.
          // eslint-disable-next-line @next/next/no-img-element
          <img className="details-image" src={value} alt={`Preview for ${path}`} />
        )}
      </>}
    </div>
  );
}

export function DetailsEditor({ initialContent }: { initialContent: SiteContent }) {
  const [draft, setDraft] = useState<ContentValue>(initialContent as unknown as ContentValue);
  const [saved, setSaved] = useState(JSON.stringify(initialContent));
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const importRef = useRef<HTMLInputElement>(null);
  const validation = validateDetails(draft);
  const unsaved = JSON.stringify(draft) !== saved;
  const change = (path: string, value: ContentValue) => { setDraft((current) => replaceAt(current, path, value)); setNotice(""); };

  async function save() {
    if (validation.errors.length) { setNotice("Error: correct the inline validation messages first."); return; }
    const snapshot = JSON.stringify(draft);
    setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/details", { method: "PUT", headers: { "Content-Type": "application/json" }, body: snapshot });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed.");
      setSaved(snapshot);
    } catch (error) { setNotice(`Error: ${error instanceof Error ? error.message : "Save failed."}`); }
    finally { setBusy(false); }
  }

  async function reset() {
    setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/details", { cache: "no-store" });
      const result: unknown = await response.json();
      if (!response.ok || !isSiteContent(result)) throw new Error("Could not reload valid content from disk.");
      setDraft(result as unknown as ContentValue); setSaved(JSON.stringify(result));
    } catch (error) { setNotice(`Error: ${error instanceof Error ? error.message : "Reset failed."}`); }
    finally { setBusy(false); }
  }

  function exportJson() {
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(draft, null, 2)}\n`], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "site.json"; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 1024 * 1024) throw new Error("JSON must be under 1 MB.");
      const result: unknown = JSON.parse(await file.text());
      const issues = validateDetails(result);
      if (!isSiteContent(result)) throw new Error(issues.errors.map((issue) => `${issue.path}: ${issue.message}`).join("; "));
      setDraft(result as unknown as ContentValue); setNotice("Imported into draft. Press Save to write it.");
    } catch (error) { setNotice(`Error: ${error instanceof Error ? error.message : "Invalid JSON."}`); }
    event.target.value = "";
  }

  return (
    <div className="details-shell">
      <header className="details-toolbar">
        <h1>Site details</h1>
        <span role="status" aria-live="polite">{notice || (busy ? "Saving / loading..." : unsaved ? "Unsaved draft" : "Saved")}</span>
        <button type="button" disabled={busy || !unsaved || !!validation.errors.length} onClick={save}>Save</button>
        <button type="button" disabled={busy} onClick={reset}>Reset</button>
        <button type="button" onClick={exportJson}>Export JSON</button>
        <button type="button" onClick={() => importRef.current?.click()}>Import JSON</button>
        <input ref={importRef} type="file" accept=".json,application/json" aria-label="Import JSON file" className="details-import" onChange={importJson} />
        <a href="/" target="_blank" rel="noopener noreferrer">Open site preview</a>
      </header>
      <div className="details-layout">
        <nav className="details-sidebar" aria-label="Content groups">{groups.map((group) => <a key={group.id} href={`#details-${group.id}`}>{group.label}</a>)}</nav>
        <main className="details-main">
          <details className="details-warnings">
            <summary>{validation.warnings.length} fields still TODO{validation.errors.length ? `; ${validation.errors.length} validation errors` : ""}</summary>
            <ul>{[...validation.errors, ...validation.warnings].map((issue, index) => <li key={`${issue.path}-${index}`}><a href={`#field-${issue.path}`}>{issue.path}</a>: {issue.message}</li>)}</ul>
          </details>
          <p>Edits stay in this draft until Save. Reset reloads disk and discards unsaved edits. Uploads are public files; do not upload secrets.</p>
          {groups.map((group) => <section key={group.id} id={`details-${group.id}`} className="details-group" aria-labelledby={`details-${group.id}-heading`}>
            <h2 id={`details-${group.id}-heading`}>{group.label}</h2>
            {group.paths.map((path) => <ContentField key={path} value={valueAt(draft, path)} path={path} errors={validation.errors} change={change} />)}
          </section>)}
        </main>
      </div>
    </div>
  );
}
