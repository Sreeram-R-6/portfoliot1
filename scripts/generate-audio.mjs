// Original deterministic PCM synthesis. No samples, loops or third-party audio.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const output = path.join(process.cwd(), "public", "audio");
await mkdir(output, { recursive: true });
const sampleRate = 8000;
const tau = Math.PI * 2;

async function wav(name, seconds, sample) {
  const length = Math.round(seconds * sampleRate);
  const data = Buffer.alloc(44 + length * 2);
  data.write("RIFF", 0);
  data.writeUInt32LE(data.length - 8, 4);
  data.write("WAVEfmt ", 8);
  data.writeUInt32LE(16, 16);
  data.writeUInt16LE(1, 20);
  data.writeUInt16LE(1, 22);
  data.writeUInt32LE(sampleRate, 24);
  data.writeUInt32LE(sampleRate * 2, 28);
  data.writeUInt16LE(2, 32);
  data.writeUInt16LE(16, 34);
  data.write("data", 36);
  data.writeUInt32LE(length * 2, 40);
  for (let index = 0; index < length; index++) {
    const value = Math.max(-1, Math.min(1, sample(index / sampleRate, seconds)));
    data.writeInt16LE(Math.round(value * 32767), 44 + index * 2);
  }
  await writeFile(path.join(output, name), data);
  console.log(`${name}: ${data.length} bytes`);
  return data.length;
}

// Every oscillator and slow amplitude cycle completes an integer number of
// cycles over twelve seconds. The boundary is phase-continuous without cuts.
const ambient = await wav("ambient.wav", 12, (time) => {
  const breathe = .78 + .22 * Math.cos(tau * time / 12);
  return breathe * (
    .18 * Math.sin(tau * 110 * time) +
    .11 * Math.sin(tau * 165 * time) +
    .08 * Math.sin(tau * 220 * time) +
    .035 * Math.sin(tau * 330 * time + .6 * Math.sin(tau * time / 12))
  );
});
function tone(time, duration, low, high, amplitude) {
  const position = time / duration;
  const envelope = Math.sin(Math.PI * position) ** 2 * (1 - position);
  const phase = tau * (low * time + (high - low) * time * time / (2 * duration));
  return amplitude * envelope * (Math.sin(phase) + .18 * Math.sin(phase * 2));
}
const hover = await wav("hover.wav", .075, (time, duration) => tone(time, duration, 760, 980, .3));
const click = await wav("click.wav", .11, (time, duration) => tone(time, duration, 480, 220, .42));
const toggle = await wav("toggle.wav", .16, (time, duration) => tone(time, duration, 330, 660, .36));
const total = ambient + hover + click + toggle;
if (total > 500_000) throw new Error("Audio budget exceeds 500 KB");
console.log(`Total: ${total} bytes. Original mono PCM WAV, 8 kHz / 16-bit.`);
