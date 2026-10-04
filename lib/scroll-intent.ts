// Load scroll enhancements when they can actually be used, not during hydration.
// All listeners are passive: the first gesture keeps native scrolling while the
// animation modules load. Restored scroll positions and deep links start at once.
export function onScrollIntent(start: () => void) {
  let started = false;
  const cleanup = () => {
    window.removeEventListener("wheel", run);
    window.removeEventListener("touchstart", run);
    window.removeEventListener("scroll", run);
    window.removeEventListener("keydown", onKey);
    document.removeEventListener("click", onLink, true);
  };
  function run() {
    if (started) return;
    started = true;
    cleanup();
    start();
  }
  function onKey(event: KeyboardEvent) {
    if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) run();
  }
  function onLink(event: MouseEvent) {
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(link instanceof HTMLAnchorElement)) return;
    if (link.origin === location.origin && link.pathname === location.pathname && link.hash) run();
  }
  if (window.scrollY > 0 || (location.hash && location.hash !== "#home")) {
    run();
  } else {
    window.addEventListener("wheel", run, { passive: true });
    window.addEventListener("touchstart", run, { passive: true });
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onLink, true);
  }
  return cleanup;
}
