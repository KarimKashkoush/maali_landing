import assert from "node:assert/strict";
import { statSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { partners } from "../lib/partners.ts";

test("all eleven official partners have unique IDs and bilingual names", () => {
  assert.equal(partners.length, 11);
  assert.equal(new Set(partners.map(({ id }) => id)).size, 11);
  assert.ok(partners.every(({ ar, en }) => ar.trim() && en.trim()));
});

test("each partner has a compact local WebP logo", () => {
  let totalBytes = 0;
  for (const { id } of partners) {
    const file = new URL(`../public/partners/partner-${id}.webp`, import.meta.url);
    const bytes = readFileSync(file);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
    totalBytes += statSync(file).size;
  }
  assert.ok(totalBytes < 80 * 1024, `Combined logos exceed budget: ${totalBytes} bytes`);
});
