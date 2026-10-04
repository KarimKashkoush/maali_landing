import assert from "node:assert/strict";
import { test } from "node:test";
import { schoolStats, studentStages, featuredStudents, previewFeedback, previewParents, contactWhatsApp } from "../lib/home-content.ts";
import { whatsappLink } from "../lib/contact.ts";
import { countMedals, medalTypes, medalsByType, schoolAchievements, totalMedals } from "../lib/achievements.ts";

test("all seven supplied numbers are preserved", () => {
  assert.deepEqual(schoolStats.map(({ value }) => value), [30, 1200, 50, 100, 50, 95, 99]);
});
test("each of four stages has three ranked demo students and no photos", () => {
  assert.equal(studentStages.length, 4);
  for (const { id } of studentStages) {
    assert.deepEqual(featuredStudents[id].map(({ rank }) => rank), [1, 2, 3]);
    assert.ok(featuredStudents[id].every(({ name, photo }) => name.ar && name.en && photo === null));
  }
});
test("every sample review has an author", () => {
  assert.equal(previewFeedback.length, previewParents.length);
});
test("WhatsApp remains inactive until the school supplies a number", () => {
  assert.equal(contactWhatsApp, "");
  assert.equal(whatsappLink(contactWhatsApp, "Test"), null);
  assert.equal(whatsappLink("javascript:alert(1)", "Test"), null);
});
test("WhatsApp links normalize international numbers and encode messages", () => {
  const link = whatsappLink("+1 (202) 555-0100", "رسالة تجريبية & اختبار\nHello");
  const url = new URL(link);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/12025550100");
  assert.equal(url.searchParams.get("text"), "رسالة تجريبية & اختبار\nHello");
});

test("medal total excludes rankings, awards and student counts", () => {
  assert.equal(schoolAchievements.length, 8);
  assert.equal(totalMedals, 25);
  assert.deepEqual(medalsByType, { diamond: 5, gold: 8, silver: 8, bronze: 4 });
  assert.equal(medalTypes.reduce((sum, type) => sum + medalsByType[type], 0), totalMedals);
  assert.equal(schoolAchievements.filter(({ distinction }) => distinction).reduce((sum, item) => sum + countMedals(item.medals), 0), 0);
});

test("medal graphics are driven by exact per-competition counts", () => {
  const counts = Object.fromEntries(schoolAchievements.map((item) => [item.id, countMedals(item.medals)]));
  assert.deepEqual(counts, { "english-olympiad": 0, "literary-skills": 3, qutoof: 9, bebras: 1, "founding-day": 8, munafis: 0, "safe-school": 0, "cultural-skills": 4 });
});
