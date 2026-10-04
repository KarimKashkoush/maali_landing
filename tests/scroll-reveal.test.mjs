import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { observeReveal } from "../lib/scroll-reveal.ts";

let observers;
let preference;
let cleanups;
class ElementStub extends EventTarget {
  classes = new Set();
  classList = {
    add: (...names) => names.forEach((name) => this.classes.add(name)),
    remove: (...names) => names.forEach((name) => this.classes.delete(name)),
  };
  contains(element) { return element === this; }
}
class ObserverStub {
  nodes = new Set();
  constructor(callback) { this.callback = callback; observers.push(this); }
  observe(node) { this.nodes.add(node); }
  unobserve(node) { this.nodes.delete(node); }
  disconnect() { this.nodes.clear(); }
  enter(node, visible = true) { this.callback([{ target: node, isIntersecting: visible }]); }
}
const watch = (node) => cleanups.push(observeReveal(node));
beforeEach(() => {
  observers = []; cleanups = [];
  preference = Object.assign(new EventTarget(), { matches: false });
  globalThis.window = { matchMedia: () => preference };
  globalThis.document = { activeElement: null };
  globalThis.IntersectionObserver = ObserverStub;
});
afterEach(() => cleanups.forEach((cleanup) => cleanup()));

test("all elements share one observer; effects start only at entry", () => {
  const first = new ElementStub(), second = new ElementStub();
  watch(first); watch(second);
  assert.equal(observers.length, 1);
  assert.equal(first.classes.size, 0);
  observers[0].enter(first, false);
  assert.equal(first.classes.size, 0);
  observers[0].enter(first);
  assert.deepEqual([...first.classes], ["animated", "fadeInDown"]);
  assert.equal(second.classes.size, 0);
  assert.equal(observers[0].nodes.has(first), false);
});

test("completed reveals remove animation transforms and never replay", () => {
  const node = new ElementStub(); watch(node);
  observers[0].enter(node);
  node.dispatchEvent(Object.assign(new Event("animationend"), { animationName: "fadeInDown" }));
  assert.equal(node.classes.size, 0);
  observers[0].enter(node);
  assert.equal(node.classes.size, 0);
});

test("reduced motion bypasses reveal animations", () => {
  preference.matches = true;
  const node = new ElementStub(); watch(node);
  assert.equal(observers.length, 0);
  assert.equal(node.classes.size, 0);
});

test("enabling reduced motion cancels running and waiting effects", () => {
  const first = new ElementStub(), second = new ElementStub();
  watch(first); watch(second); observers[0].enter(first);
  preference.matches = true; preference.dispatchEvent(new Event("change"));
  assert.equal(first.classes.size, 0);
  assert.equal(observers[0].nodes.size, 0);
  observers[0].enter(second);
  assert.equal(second.classes.size, 0);
});

test("keyboard focus shows a control immediately without animation", () => {
  const node = new ElementStub(); watch(node);
  node.dispatchEvent(new Event("focusin"));
  observers[0].enter(node);
  assert.equal(node.classes.size, 0);
});

test("unmount removes pending work and existing animations", () => {
  const node = new ElementStub(); watch(node); observers[0].enter(node);
  cleanups[0]();
  assert.equal(node.classes.size, 0);
  assert.equal(observers[0].nodes.size, 0);
});

test("missing observer support leaves content visible", () => {
  delete globalThis.IntersectionObserver;
  const node = new ElementStub(); watch(node);
  assert.equal(node.classes.size, 0);
  assert.equal(observers.length, 0);
});
