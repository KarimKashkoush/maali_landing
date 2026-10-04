import sharp from "sharp";
import { copyFile, mkdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";

// Retain the full-resolution original outside public/ so this is reproducible.
const source = new URL("../assets/icon-source.png", import.meta.url);
const output = new URL("../app/icon.png", import.meta.url);
await mkdir(new URL("../assets/", import.meta.url), { recursive: true });
try {
  await copyFile(output, source, constants.COPYFILE_EXCL);
} catch (error) {
  if (error.code !== "EEXIST") throw error;
}
await sharp(fileURLToPath(source))
  .resize(96, 96, { fit: "contain", background: "#00000000" })
  .png({ compressionLevel: 9, palette: true, colours: 128 })
  .toFile(fileURLToPath(output));
console.log({ originalBytes: (await stat(source)).size, optimizedBytes: (await stat(output)).size });
