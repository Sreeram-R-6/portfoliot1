import { readFile, writeFile, rename, unlink, mkdir, realpath } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { randomUUID } from "node:crypto";
import type { SiteContent } from "@/content/site";

export const maxUploadBytes = 5 * 1024 * 1024;
const contentDirectory = resolve(process.cwd(), "src/content");
const uploadDirectory = resolve(process.cwd(), "public/uploads");

async function checkedDirectory(directory: string) {
  const root = await realpath(process.cwd());
  const actual = await realpath(directory);
  if (!actual.startsWith(`${root}${sep}`) || actual !== directory) throw new Error("Unexpected write directory.");
  return actual;
}

export async function readDetails(): Promise<SiteContent> {
  return JSON.parse(await readFile(resolve(contentDirectory, "site.json"), "utf8"));
}

export async function writeDetails(content: SiteContent) {
  const directory = await checkedDirectory(contentDirectory);
  const target = resolve(directory, "site.json");
  // Do not follow an existing symlink to a different content file.
  if (await realpath(target) !== target) throw new Error("Unexpected content path.");
  const temporary = resolve(directory, `site-${randomUUID()}.tmp`);
  try {
    await writeFile(temporary, `${JSON.stringify(content, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
    await rename(temporary, target);
  } catch (error) {
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

export class DetailsRequestError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) throw new DetailsRequestError("Cross-origin writes are not allowed.", 403);
}

export async function limitedBody(request: Request, limit: number) {
  if (Number(request.headers.get("content-length")) > limit) throw new DetailsRequestError("Payload is too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new DetailsRequestError("Missing request body.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > limit) { await reader.cancel(); throw new DetailsRequestError("Payload is too large.", 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}

export function checkedFilename(filename: string) {
  let decoded: string;
  try { decoded = decodeURIComponent(filename); } catch { throw new DetailsRequestError("Invalid filename."); }
  if (!decoded || /[\\/\x00-\x1f]/.test(decoded) || decoded.includes("..")) throw new DetailsRequestError("Path-traversal filenames are not allowed.");
  return decoded;
}

export async function saveUpload(file: File, kind: string) {
  const name = checkedFilename(file.name);
  const extension = name.split(".").at(-1)?.toLowerCase() ?? "";
  const types: Record<string, string[]> = { png: ["image/png"], jpg: ["image/jpeg"], jpeg: ["image/jpeg"], webp: ["image/webp"], svg: ["image/svg+xml"], pdf: ["application/pdf"], mp3: ["audio/mpeg", "audio/mp3"], ogg: ["audio/ogg", "application/ogg"], wav: ["audio/wav", "audio/x-wav"] };
  const extensions = kind === "cv" ? ["pdf"] : kind === "audio" ? ["mp3", "ogg", "wav"] : ["png", "jpg", "jpeg", "webp", "svg"];
  if (!types[extension]?.includes(file.type) || !extensions.includes(extension)) throw new DetailsRequestError("Use an image, PDF CV, or MP3/OGG/WAV audio file with the matching destination.");
  if (!file.size || file.size > maxUploadBytes) throw new DetailsRequestError("Files must be between 1 byte and 5 MB.", 413);
  const bytes = Buffer.from(await file.arrayBuffer());
  const text = bytes.toString("utf8");
  const signatures: Record<string, boolean> = {
    mp3: bytes.toString("ascii", 0, 3) === "ID3" || (bytes[0] === 255 && (bytes[1] & 224) === 224),
    ogg: bytes.toString("ascii", 0, 4) === "OggS",
    wav: bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WAVE",
    png: bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    jpg: bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
    jpeg: bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
    webp: bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP",
    pdf: bytes.toString("ascii", 0, 5) === "%PDF-",
    svg: /^\s*(?:<\?xml[^>]*>\s*)?<svg\b[\s\S]*<\/svg>\s*$/i.test(text),
  };
  if (!signatures[extension]) throw new DetailsRequestError("File content does not match its format.");
  if (extension === "svg") {
    const tags = new Set("svg g path rect circle ellipse line polyline polygon text tspan defs use symbol lineargradient radialgradient stop pattern clippath mask title desc filter fegaussianblur feoffset feblend fecolormatrix fecomposite femerge femergenode feflood".split(" "));
    const unknownTag = [...text.matchAll(/<\/?\s*([a-z][\w:-]*)\b/gi)].some((match) => !tags.has(match[1].toLowerCase()));
    if (unknownTag || /<!|\son\w+\s*=|(?:href|src)\s*=\s*["'](?!#)|xml:base\s*=|@import|url\(\s*["']?(?!#)|style\s*=\s*["'][^"']*\\/i.test(text)) throw new DetailsRequestError("SVG must be static and self-contained.");
  }
  await mkdir(uploadDirectory, { recursive: true });
  const directory = await checkedDirectory(uploadDirectory);
  const stem = name.slice(0, -(extension.length + 1)).replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 60) || "upload";
  const savedName = `${stem}-${randomUUID()}.${extension}`;
  await writeFile(resolve(directory, savedName), bytes, { flag: "wx" });
  return `/uploads/${savedName}`;
}
