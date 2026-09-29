import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const git = (...args) => execFileSync("git", args, { maxBuffer: 64 * 1024 * 1024 });
const tracked = git("ls-files", "-z").toString().split("\0").filter(Boolean);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
function files(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : entry.isFile() ? [path] : [];
  });
}
const references = new Set(files("public/_reference").map((path) => hash(readFileSync(path))));
const violations = [];
for (const path of tracked) {
  if (path === "public/_reference" || path.startsWith("public/_reference/")) violations.push(`Tracked reference: ${path}`);
  // Check the index too: a changed working file must not conceal a staged copy.
  if (references.size && (references.has(hash(git("show", `:${path}`))) || (existsSync(path) && references.has(hash(readFileSync(path)))))) {
    violations.push(`Reference hash copied: ${path}`);
  }
}
for (const path of files("src")) {
  if (/\.(?:[cm]?[jt]sx?|css|json|html)$/.test(path) && /(?:public\/)?_reference(?:\/|\\)/.test(readFileSync(path, "utf8"))) {
    violations.push(`Reference used by source: ${relative(".", path)}`);
  }
}
if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}
console.log(`Reference guard passed (${tracked.length} indexed files, ${references.size} local reference hashes).`);
