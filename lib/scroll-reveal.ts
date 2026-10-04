// One observer for all entrance animations. Content stays visible without JS.
const waiting = new Set<HTMLElement>();
const running = new Map<HTMLElement, () => void>();
let observer: IntersectionObserver | null = null;
let motion: MediaQueryList | null = null;

function releaseWhenIdle() {
  if (waiting.size) return;
  observer?.disconnect();
  observer = null;
  if (running.size) return;
  motion?.removeEventListener("change", onMotionChange);
  motion = null;
}

function onMotionChange() {
  if (!motion?.matches) return;
  waiting.clear();
  running.forEach((finish) => finish());
  releaseWhenIdle();
}

export function observeReveal(node: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") return () => {};
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches) return () => {};
  if (!motion) {
    motion = preference;
    motion.addEventListener("change", onMotionChange);
  }
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (!entry.isIntersecting || !waiting.has(element)) return;
        observer?.unobserve(element);
        waiting.delete(element);
        // Never animate a focused form/control out of view.
        if (element.contains(document.activeElement)) return;
        const finish = () => {
          element.removeEventListener("animationend", onEnd);
          element.removeEventListener("animationcancel", onEnd);
          element.classList.remove("animated", "fadeInDown");
          running.delete(element);
          releaseWhenIdle();
        };
        const onEnd = (event: AnimationEvent) => {
          if (event.target === element && event.animationName === "fadeInDown") finish();
        };
        running.set(element, finish);
        element.addEventListener("animationend", onEnd);
        element.addEventListener("animationcancel", onEnd);
        element.classList.add("animated", "fadeInDown");
      });
      releaseWhenIdle();
    }, { threshold: 0.08 });
  }
  waiting.add(node);
  observer.observe(node);
  const revealOnFocus = () => {
    observer?.unobserve(node);
    waiting.delete(node);
    running.get(node)?.();
    releaseWhenIdle();
  };
  node.addEventListener("focusin", revealOnFocus);
  return () => {
    node.removeEventListener("focusin", revealOnFocus);
    revealOnFocus();
  };
}
