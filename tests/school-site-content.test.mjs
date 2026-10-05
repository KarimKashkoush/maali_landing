import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { admissionDocuments, campusPhotos, schoolBranches, schoolFaqs, schoolLinks, schoolNews } from "../lib/school-site-content.ts";

test("news has three dated stories with distinct official destinations and local images", () => {
  assert.equal(schoolNews.length, 3);
  assert.equal(new Set(schoolNews.map((item) => item.slug)).size, 3);
  for (const item of schoolNews) {
    assert.ok(Number.isFinite(Date.parse(item.date)));
    assert.ok(item.title.ar && item.title.en && item.summary.ar && item.summary.en);
    assert.ok(existsSync(new URL(`../public/news/news-${item.id}.webp`, import.meta.url)));
  }
});

test("gallery and branch locations are complete and bilingual", () => {
  assert.equal(campusPhotos.length, 6);
  for (const photo of campusPhotos) {
    assert.ok(photo.ar && photo.en);
    assert.ok(existsSync(new URL(`../public/campus/campus-${photo.id}.webp`, import.meta.url)));
  }
  assert.equal(schoolBranches.length, 4);
  assert.equal(schoolBranches[0].latitude, schoolBranches[1].latitude);
  assert.equal(schoolBranches[0].longitude, schoolBranches[1].longitude);
  for (const branch of schoolBranches) {
    assert.ok(branch.latitude > 21 && branch.latitude < 22);
    assert.ok(branch.longitude > 40 && branch.longitude < 41);
  }
});

test("help and admission content use valid secure destinations", () => {
  assert.ok(Object.values(schoolLinks).every((url) => url.startsWith("/") || new URL(url).protocol === "https:"));
  assert.ok(Object.values(schoolLinks).every((url) => !url.includes("maalischool.org")));
  assert.equal(admissionDocuments.length, 4);
  assert.ok(schoolFaqs.length >= 5);
  assert.ok(schoolFaqs.every((item) => item.q.ar && item.q.en && item.a.ar && item.a.en));
});

test("home adds missing sections once and omits owner-excluded staff, principal and calendar", () => {
  const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const name of ["SchoolOverview", "SchoolNumbers", "EducationStages", "CampusLife", "SchoolAchievements", "SchoolPartners", "SchoolMedia", "AdmissionsSection", "SchoolHelp", "ParentFeedback", "ContactSection"]) {
    assert.equal(page.split(`<${name} />`).length - 1, 1, `${name} must appear once`);
  }
  assert.doesNotMatch(page, /<(Principal|Staff|Calendar)/);
});

test("rendered components contain no links to the retired website", () => {
  const root = new URL("../app/", import.meta.url);
  for (const path of readdirSync(root, { recursive: true }).filter((path) => path.endsWith(".tsx"))) {
    assert.doesNotMatch(readFileSync(new URL(path.replaceAll("\\", "/"), root), "utf8"), /https?:\/\/(?:www\.)?maalischool\.org/);
  }
});
