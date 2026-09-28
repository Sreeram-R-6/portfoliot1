import template from "./site.json";
import type { SiteContent } from "./site";

export type ContentValue = string | null | ContentValue[] | { [key: string]: ContentValue };
export type FieldIssue = { path: string; message: string };
export type Validation = { errors: FieldIssue[]; warnings: FieldIssue[] };

// Only the shape is derived from JSON; values are never used as validation defaults.
export function isTodo(value: unknown) {
  return value === null || (typeof value === "string" && (/TODO/i.test(value) || value === "\u2014" || value.includes("portfolio.example")));
}

export function isValidLink(value: string, absolute = false) {
  if (/^TODO(?:\b|:)/i.test(value.trim())) return !absolute;
  if (/^[#][a-z][\w-]*$/i.test(value) && !absolute) return true;
  if (/^\/(?!\/)/.test(value) && !absolute) {
    try { return !/[\\\x00-\x20]/.test(value) && !decodeURIComponent(value).split("/").includes(".."); } catch { return false; }
  }
  if (/^mailto:/i.test(value) && !absolute) return /^mailto:[^\s@?]+@[^\s@?]+\.[^\s@?]+(?:\?[^\s]*)?$/.test(value);
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && !!url.hostname && !url.username && !url.password && !/\s/.test(value);
  } catch { return false; }
}

export function validateDetails(payload: unknown): Validation {
  const errors: FieldIssue[] = [];
  const warnings: FieldIssue[] = [];
  const error = (path: string, message: string) => errors.push({ path, message });
  function walk(value: unknown, shape: unknown, path: string) {
    if (path.endsWith(".image") && value === null) { warnings.push({ path, message: "TODO: provide an image." }); return; }
    if (Array.isArray(shape)) {
      if (!Array.isArray(value)) { error(path, "Expected a list."); return; }
      if (value.length > 100) { error(path, "Use at most 100 items."); return; }
      const itemShape = shape[0] ?? (["navigation.links", "footer.links"].includes(path) ? { label: "", href: "" } : "");
      value.forEach((item, index) => walk(item, itemShape, `${path}.${index}`));
      if (["projects", "sections.experience.entries"].includes(path)) {
        const seen = new Set<string>();
        value.forEach((item, index) => {
          if (item && typeof item === "object" && "id" in item && typeof item.id === "string") {
            if (seen.has(item.id)) error(`${path}.${index}.id`, "IDs must be unique in this list.");
            seen.add(item.id);
          }
        });
      }
      return;
    }
    if (shape !== null && typeof shape === "object") {
      if (!value || typeof value !== "object" || Array.isArray(value)) { error(path, "Expected an object."); return; }
      const expected = { ...shape } as Record<string, unknown>;
      const project = /^projects\.\d+$/.test(path);
      if (project) expected.summary = "";
      const actual = value as Record<string, unknown>;
      for (const key of Object.keys(actual)) if (!Object.hasOwn(expected, key)) error(path ? `${path}.${key}` : key, "Unknown field.");
      for (const key of Object.keys(expected)) {
        if (project && key === "summary" && actual[key] === undefined) continue;
        walk(actual[key], expected[key], path ? `${path}.${key}` : key);
      }
      return;
    }
    if (shape === null && value === null) { warnings.push({ path, message: "TODO: provide an image." }); return; }
    if (typeof value !== "string") { error(path, "Expected text."); return; }
    if (!value.trim()) error(path, "Required. Use TODO if this is not yet provided.");
    if (value.length > 10000) error(path, "Use at most 10,000 characters.");
    if (isTodo(value)) warnings.push({ path, message: "Still TODO." });
    else if (/^(?:todos\.\d+|projects\.\d+\.todo)$/.test(path)) warnings.push({ path, message: value });
    if (/(?:github_pat_[\w]{20,}|ghp_[\w]{20,}|-----BEGIN .*PRIVATE KEY-----|sk-[\w-]{20,})/.test(value)) error(path, "Do not store credentials or private keys here.");
    if (/(?:\.href|Href|\.image|\.siteUrl)$/.test(path) && value.trim() && !isValidLink(value, path === "metadata.siteUrl")) error(path, "Use an http(s) URL, mailto address, site path, anchor or TODO.");
    if (path.endsWith(".id") && !/^[a-z][a-z0-9-]*$/.test(value)) error(path, "Use a lowercase ID beginning with a letter.");
    if (/sections\.[^.]+\.id$/.test(path)) {
      const section = path.split(".")[1] as keyof typeof template.sections;
      if (value !== section) error(path, `Keep the structural ID ${section}; motion relies on it.`);
    }
    if (path === "footer.id" && value !== "contact") error(path, "Keep the structural ID contact.");
    if (/sections\.experience\.entries\.\d+\.index$/.test(path) && !/^\d+$/.test(value)) error(path, "Use a numeric display index.");
  }
  walk(payload, template, "");
  return { errors, warnings };
}

export function isSiteContent(payload: unknown): payload is SiteContent {
  return validateDetails(payload).errors.length === 0;
}

export function fieldKind(path: string) {
  if (path.endsWith(".image")) return "image";
  if (path === "footer.cv.href") return "cv";
  if (/sections\.statistics\.counters\.\d+\.value$/.test(path)) return "number";
  if (/(?:\.href|Href|\.siteUrl)$/.test(path)) return "url";
  if (/(?:description|summary|\.todo|^todos\.)/i.test(path)) return "textarea";
  return "text";
}

export function recommendedLimit(path: string): number | undefined {
  if (path === "sections.identity.description") return 200;
  if (/^projects\.\d+\.summary$/.test(path)) return 140;
  if (/^projects\.\d+\.description$/.test(path)) return 500;
  if (/^sections\.experience\.entries\.\d+\.description$/.test(path)) return 240;
  if (/^sections\.statistics\.tools\.\d+$/.test(path)) return 40;
  if (/^footer\..*\.label$/.test(path)) return 40;
  if (/(?:^role|\.role|\.eyebrow)$/.test(path)) return 60;
  if (/\.title$/.test(path)) return 48;
}
