import assert from "node:assert/strict";
import { test } from "node:test";
import { schools, schoolGroups, getSchool } from "../lib/schools.ts";
import { schoolHighlights } from "../lib/school-highlights.ts";

test("national boys has three stages and international has all four", () => {
  assert.deepEqual(schoolGroups.map(({ id }) => id), ["national", "international"]);
  assert.deepEqual(schools.filter(({ group }) => group === "national").map(({ slug }) => slug), ["national-primary", "national-middle", "national-secondary"]);
  assert.deepEqual(schools.filter(({ group }) => group === "international").map(({ slug }) => slug), ["international-kindergarten", "international-primary", "international-middle", "international-secondary"]);
});

test("each school card has its own valid page and bilingual learning themes", () => {
  assert.equal(new Set(schools.map(({ slug }) => slug)).size, 7);
  assert.deepEqual(Object.keys(schoolHighlights).sort(), schools.map(({ slug }) => slug).sort());
  for (const school of schools) {
    assert.equal(getSchool(school.slug), school);
    assert.equal(schoolHighlights[school.slug].length, 3);
    assert.ok(schoolHighlights[school.slug].every(({ ar, en }) => ar && en));
    assert.ok(["kindergarten", "primary", "middle", "secondary"].includes(school.slug.split("-").at(-1)));
  }
});
