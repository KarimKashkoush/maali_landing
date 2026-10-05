import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Re-encode the original artwork only: no tracing, recolouring or cropping.
const source = fileURLToPath(new URL("../public/mini_logo_display.png", import.meta.url));
const directory = new URL("../assets/school-mark/", import.meta.url);
await mkdir(directory, { recursive: true });
for (const width of [96, 256, 384, 800]) {
  const output = fileURLToPath(new URL(`mark-${width}.webp`, directory));
  const result = await sharp(source).resize(width, width).webp({ quality: 65, effort: 6 }).toFile(output);
  console.log(`${width}px: ${result.size} bytes`);
}
