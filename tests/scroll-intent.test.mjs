import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { onScrollIntent } from "../lib/scroll-intent.ts";

class ElementStub {
  constructor(match = null) { this.match = match; }
  closest() { return this.match; }
}
class AnchorStub extends ElementStub {}

beforeEach(() => {
  globalThis.window = Object.assign(new EventTarget(), { scrollY: 0 });
  globalThis.document = new EventTarget();
  globalThis.location = { origin: "http://localhost:3001", pathname: "/", hash: "" };
  globalThis.Element = ElementStub;
  globalThis.HTMLAnchorElement = AnchorStub;
});

test("does not initialize at page load; scroll intent initializes only once", () => {
  let calls = 0;
  const cancel = onScrollIntent(() => calls++);
  assert.equal(calls, 0);
  for (const type of ["wheel", "scroll", "touchstart"]) window.dispatchEvent(new Event(type));
  assert.equal(calls, 1);
  cancel();
});

test("unmount cancels pending initialization", () => {
  let calls = 0;
  onScrollIntent(() => calls++)();
  window.dispatchEvent(new Event("wheel"));
  assert.equal(calls, 0);
});

test("restored scroll and deep links initialize immediately", () => {
  window.scrollY = 120;
  let calls = 0;
  onScrollIntent(() => calls++)();
  window.scrollY = 0;
  location.hash = "#brand-story";
  onScrollIntent(() => calls++)();
  location.hash = "#home";
  onScrollIntent(() => calls++)();
  assert.equal(calls, 2);
});

test("keyboard scrolling works but typing does not initialize animations", () => {
  let calls = 0;
  const cancel = onScrollIntent(() => calls++);
  const typing = new Event("keydown");
  Object.defineProperties(typing, { key: { value: " " }, target: { value: new ElementStub({}) } });
  window.dispatchEvent(typing);
  assert.equal(calls, 0);
  window.dispatchEvent(Object.assign(new Event("keydown"), { key: "PageDown" }));
  assert.equal(calls, 1);
  cancel();
});

test("in-page navigation prepares animations", () => {
  let calls = 0;
  const cancel = onScrollIntent(() => calls++);
  const link = Object.assign(new AnchorStub(), { ...location, hash: "#brand-story" });
  const click = new Event("click");
  Object.defineProperty(click, "target", { value: new ElementStub(link) });
  document.dispatchEvent(click);
  assert.equal(calls, 1);
  cancel();
});
