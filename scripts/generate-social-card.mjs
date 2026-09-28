import { readFile, writeFile } from "node:fs/promises";

// Original vector artwork. The browser screenshot step exports its PNG.
const content = await readFile(new URL("../src/content/site.ts", import.meta.url), "utf8");
const read = (key) => {
  const value = content.match(new RegExp(`${key}: "([^"\\n]+)"`))?.[1];
  if (!value) throw new Error(`Missing content field: ${key}`);
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#000"/>
<g stroke="#25272f"><path d="M64 0V630M1136 0V630M0 64H1200M0 566H1200M600 0V630"/></g>
<rect x="64" y="112" width="80" height="80" fill="#9df133"/>
<path d="M86 132H124V142H96V149H124V172H86V162H114V159H86Z" fill="#070210"/>
<text x="64" y="335" fill="#fff" font-family="sans-serif" font-size="112" font-weight="700">${read("name").toUpperCase()}</text>
<text x="68" y="414" fill="#9df133" font-family="sans-serif" font-size="32">${read("role")}</text>
<path d="M64 498H1136" stroke="#9df133"/>
</svg>`;
await writeFile(new URL("../public/seo/social-card.svg", import.meta.url), svg);
