import { existsSync, renameSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const routes = [
  [resolve("src/app/api/details/route.ts"), resolve("src/.pages-details-route.ts")],
  [resolve("src/app/api/details/upload/route.ts"), resolve("src/.pages-upload-route.ts")],
];

// Pages has no server runtime. Keep these routes available to `npm run dev`,
// and leave them out of this one static export build.
const parked = [];
try {
  for (const [source, destination] of routes) {
    if (!existsSync(source) || existsSync(destination)) throw new Error(`Unexpected Pages route state: ${source}`);
    renameSync(source, destination);
    parked.push([source, destination]);
  }
  for (const command of ["scripts/check-reference-assets.mjs", "node_modules/next/dist/bin/next"]) {
    const args = command.endsWith("/next") ? [command, "build"] : [command];
    const result = spawnSync(process.execPath, args, {
      env: { ...process.env, GITHUB_PAGES: "1" },
      stdio: "inherit",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`${command} failed with status ${result.status ?? result.signal}`);
  }
} finally {
  for (const [source, destination] of parked.reverse()) renameSync(destination, source);
}
