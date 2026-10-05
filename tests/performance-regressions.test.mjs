import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the hero and its conditional high-priority preload share responsive candidates", () => {
  const page = read("app/page.tsx");
  assert.match(page, /imageSrcSet=\{schoolMark.srcSet\}/);
  assert.match(page, /srcSet=\{schoolMark.srcSet\}/);
  assert.match(page, /imageSizes=\{heroMarkSizes\}/);
  assert.match(page, /sizes=\{heroMarkSizes\}/);
  assert.match(page, /media=\{heroMarkMedia\}/);
  assert.equal((page.match(/fetchPriority="high"/g) || []).length, 2);
  for (const [width, budget] of [[96, 4000], [256, 12000], [384, 18000], [800, 40000]]) {
    assert.ok(statSync(new URL(`../assets/school-mark/mark-${width}.webp`, import.meta.url)).size < budget);
  }
});

test("Ping remains primary without downloading the obsolete Cairo fallback", () => {
  assert.match(read("app/layout.tsx"), /PingARLT-Bold.woff2/);
  assert.match(read("app/layout.tsx"), /PingARLT-Black.woff2/);
  assert.doesNotMatch(read("app/layout.tsx"), /Cairo-Variable|cairo.variable/);
  assert.doesNotMatch(read("app/globals.css"), /var\(--font-cairo\)/);
});

test("the loading fallback does not eagerly preload a competing logo", () => {
  const loading = read("app/_components/ui/LogoLoading.tsx");
  assert.doesNotMatch(loading, /loading="eager"|<Image|<img/);
  assert.match(loading, /backgroundImage/);
});

test("overview image is deferred with a stable frame and a no-JavaScript fallback", () => {
  assert.match(read("app/_components/ui/SchoolOverview.tsx"), /DeferredImage frameClassName="aspect-\[4\/5\]/);
  const image = read("app/_components/ui/DeferredImage.tsx");
  assert.match(image, /rootMargin: "300px 0px"/);
  assert.match(image, /<noscript>/);
  assert.match(image, /observer.disconnect\(\)/);
});

function luminance(hex) {
  const rgb = hex.match(/\w\w/g).map((c) => parseInt(c, 16) / 255)
    .map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
test("small decorative numbers pass 4.5:1 contrast instead of relying on aria-hidden", () => {
  assert.ok(contrast("8a641f", "ffffff") >= 4.5);
  assert.match(read("app/_components/ui/SchoolOverview.tsx"), /text-\[#8a641f\] dark:text-\[#edc36c\]/);
  // #153f3b at 75% opacity, composited on the cards' white background.
  assert.ok(contrast("506f6c", "ffffff") >= 4.5);
  assert.match(read("app/_components/ui/ParentFeedback.tsx"), /text-xs text-\[#153f3b\]\/75/);
});
