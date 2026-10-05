import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("feedback pins the following page flow instead of inserting a gap below its cards", () => {
  const page = read("app/page.tsx");
  assert.match(page, /<div data-feedback-flow>\s*<ParentFeedback\s*\/>\s*<AdmissionsSection\s*\/>\s*<SchoolHelp\s*\/>\s*<ContactSection\s*\/>\s*<\/div>/);
  const feedback = read("app/_components/ui/ParentFeedback.tsx");
  assert.match(feedback, /closest<HTMLElement>\("\[data-feedback-flow\]"\)/);
  assert.match(feedback, /trigger: section, pin: flow/);
  assert.match(feedback, /id: "feedback-horizontal"/);
  assert.match(feedback, /end: \(\) => `\+=\$\{distance\(\)\}`/);
  assert.doesNotMatch(feedback, /min-h-\[calc\(100svh|justify-center/);
  assert.match(feedback, /href="#admissions"/);
  assert.match(feedback, /motion-reduce:overflow-visible/);
  // Include the scrolling hint in the fit check, not just the cards.
  assert.ok(feedback.indexOf('display: "flex"') < feedback.indexOf("pin.scrollHeight"));
});

test("anchors after feedback account for the whole pinned travel", () => {
  const smooth = read("app/_components/ui/SmoothScroll.tsx");
  assert.match(smooth, /ScrollTrigger.getById\("feedback-horizontal"\)/);
  assert.match(smooth, /feedback\?\.pin\?\.contains\(target\)/);
  assert.match(smooth, /feedback.end \+ localTop \+ 80 - margin/);
});

test("footer artwork stays white in both themes without a white surrounding tile", () => {
  const footer = read("app/_components/layout/Footer.tsx");
  assert.match(footer, /src="\/logo.png"[^>]+className="[^"]*brightness-0 invert"/);
  assert.doesNotMatch(footer, /inline-block rounded-xl bg-white/);
});

test("award names use the actual C artwork orange on a readable surface", () => {
  const achievements = read("app/_components/ui/SchoolAchievements.tsx");
  assert.match(achievements, /<h4[^\n]+text-\[#ae5126\]/);
  assert.match(achievements, /<h4[^\n]+bg-white/);
  assert.match(achievements, /<h4[^\n]+dark:bg-white/);
});
