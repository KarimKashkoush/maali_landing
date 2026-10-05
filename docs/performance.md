# Performance and search readiness

## Background video

- `lib/school-video.ts` selects the video and poster.
- The current source is `videoplayback.mp4`: approximately 81 seconds, 640×360 H.264. The original picture stream is preserved; the audio track is removed and MP4 fast-start enabled.
- The published asset is 4,357,722 bytes; its WebP poster is 16,700 bytes (previously 24,360 bytes). Only these prepared assets belong in `public/videos`, not the original downloads.
- No video source or poster is assigned until at least 1% of the section is visible. `preload="none"` alone does not defer a video poster or an autoplay video. The CSS background provides a stable initial fallback.
- Playback pauses outside the viewport or in a hidden tab and resumes at the same position. Reduced-motion and Save-Data users get a still image without an initial video download.
- There is no YouTube player, iframe, API script, or tracking connection.
- `/videos/*` has a one-year immutable cache policy. Always use a new filename/version when replacing an asset.

## Before publishing

The project is still in development. Do not invent a production domain or submit localhost URLs to search engines. Once the domain and hosting are final:

1. Set correct metadataBase, page-specific canonical URLs, robots.txt, and a sitemap listing the real routes.
2. Verify the school name, location, contact details, and actual page content before adding structured data. English currently shares the Arabic URL; dedicated locale routes are needed for independent language indexing.
3. Make school links discoverable outside a dialog. Replace the clearly marked preview student names/rankings and parent reviews in `lib/home-content.ts` with approved content. Confirm the achievement breakdown in `lib/achievements.ts`.
4. Test Core Web Vitals on production hosting and real mobile connections. A successful local build is not a PageSpeed score or proof of search ranking.
5. Verify media byte-range responses, caching, and HTTPS on the deployment host, then configure Search Console.

The page has an Arabic heading and description in server-rendered HTML, individual school metadata, and Open Graph titles/descriptions. Ping remains the primary font. Its WOFF2 files total 127,368 bytes instead of 317,016 bytes in OTF, with the same glyphs and typography. The obsolete Cairo web-font fallback is no longer registered: disabling its preload did not prevent a later 227,539-byte font request in the supplied production audit. Missing glyphs use system fallbacks without another web-font download; original font files are retained.

## Local audits

Do not use `npm run dev` as the production performance baseline. Its unminified JavaScript, hot reload, React development checks, and development tools affect CPU time and transfer sizes.

Run `npm run build`, then `npm run start -- --port 3001`, and audit `http://localhost:3001/` in Lighthouse. Use the same mobile preset and throttling for comparisons and a clean browser session, so stored data/extensions do not skew the run. This runs locally and does not publish the site.

The hero image uses responsive Next.js optimization with eager loading and high fetch priority; the other logos use correctly sized, lazy-loaded images. The schools dialog library is requested on hover/focus/click instead of in the initial render. The decorative desktop cursor initializes after pointer movement. Named marquee and social containers use the accessible `group` role.

The hero wraps its image in a `picture` with a tiny inline source for the short-screen breakpoints where the logo is hidden. `lib/school-mark.ts` supplies pre-encoded responsive WebP assets and shared `sizes`/`srcSet` to both the high-priority media-qualified preload and the image. Static imports provide hashed immutable URLs and bypass runtime image optimization on the LCP path. Rebuild these assets with `node scripts/optimize-school-mark.mjs`; the original PNG is retained. Verify both 390×667 (hidden) and 390×844 (visible) after changing these breakpoints.

The browser icon is 96×96 and 3,956 bytes instead of the original 93,146 bytes. `scripts/optimize-icon.mjs` rebuilds it from `assets/icon-source.png` without changing the full-resolution source. Navbar section links use native anchors (no route prefetch or redundant RSC requests for the same page); links to separate school pages still use Next Link. The language button's accessible name includes its visible EN/ع text.

Audit entries starting with `chrome-extension://` belong to the browser, not this site's bundle. Disable extensions in the audit profile rather than changing application code to address their minification or unused-JavaScript warnings. Some unused framework runtime and compatibility polyfills are expected; do not patch Next.js dependencies to remove them based only on a coverage estimate.

These changes reduce resource cost; they do not establish a Lighthouse score. Re-run the audit on the production build after changes, and repeat on the final host before release.

## Animation startup

ScrollSmoother and the brand timeline load on scroll intent (wheel, touch, scrolling keys, in-page links, or restored scroll position), not immediately during hydration. Native scrolling remains available while the modules load. The decorative hero pattern loads its animation on pointer interaction and measures tile positions only when needed. Reduced-motion handling and cleanup remain in place. These are normal progressive enhancements for every visitor, not Lighthouse-specific behavior.

Brand-story artwork is also mounted only when the section is within 200px of the viewport; the square grid reserves its layout before images load. Native `loading="lazy"` alone fetched these images within the browser's much larger near-viewport threshold during the initial audit. Text remains server-rendered and the hero logo stays eager/high-priority.

Run `node --experimental-strip-types --test tests/scroll-intent.test.mjs` to check initialization, cleanup, keyboard input, restored scrolling, and in-page navigation.

## Homepage additions

- The numbers section uses IntersectionObserver and a shared requestAnimationFrame loop only while visible counters are counting. Final numbers remain in server-rendered HTML and screen-reader text; reduced-motion users get the final values directly.
- Student tabs show three fictional names per stage, with keyboard navigation and no photos or image requests. The preview disclosure must stay until the school supplies approved names and rankings.
- Achievements and medal totals derive from one data file. Each medal is an inline SVG, so nine medals produce nine graphics without nine network requests. Rankings, awards, and student counts are not added to the medal total.
- Parent reviews reuse the existing GSAP bundle, loaded on scroll intent. The pinned track moves physically right-to-left in both languages and releases at its end. Compact screens use native horizontal browsing to avoid pinning cards taller than the available viewport; reduced-motion users get a static grid. A skip link leads directly to contact.
- Contact preview has no backend or external request. Set `contactWhatsApp` to the school's confirmed international number to enable the explicit WhatsApp link after preview. Set official profiles in `socialUrls`; empty values do not navigate to guessed accounts.
- All new section styling uses Tailwind. No new font, animation library, student photos, or external service was added. Re-run production Lighthouse to measure the net effect; no new score is implied by the build checks.

Run `node --experimental-strip-types --test tests/*.test.mjs` for content, medal arithmetic, contact-link validation, and scroll-intent tests.

## Entrance animations and loading UI

- Animate.css supplies `fadeInDown`, `fadeInRight`, and `pulse`. Only those source styles plus the library's base/variables are imported, not its full animation catalog or any external CDN.
- Below-the-fold titles/cards reveal once when visible using a shared IntersectionObserver. Animation classes are removed on completion, unmount, keyboard focus, or a change to reduced motion. No additional scroll/frame loop is used, and HTML remains visible if JavaScript is unavailable.
- The hero and GSAP-owned pin/track elements are not wrapped in reveal animations. Student tab changes animate newly mounted cards without changing their layout.
- `app/loading.tsx` uses the original logo clipped into two halves: the left column emerges right-to-left behind the fixed right column, with a gentle pulse while the route is pending. It follows the actual Next.js route loading lifecycle; there is no forced splash-screen delay, fake progress percentage, or wait for background video/assets. Fast or prefetched routes may not show it at all.
- Reduced-motion users see a static loader. Both halves share one pre-encoded CSS background image. A hidden streamed fallback no longer emits competing eager-image preloads. The normal page is never held back just to display the animation.

## Production report reviewed 2026-10-05

The supplied Vercel report scored Performance 81, Accessibility 97, Best Practices 96, SEO 100. These are **baseline figures, not results for this revision**.

- Accessibility failures: small gold value numbers on white (2.16:1), and translucent feedback numbers (2.79:1). These now use higher-contrast colors; source regression tests cover the replacements and the minimum 4.5:1 ratio.
- The only scored console exception was thrown by a `chrome-extension://.../ad-blocker/content.js` script. Every minification warning listed in that report was extension-owned too. Do not mask console errors or remove features to hide external extension failures.
- The below-fold courtyard photograph now waits until within 300px of the viewport, with a reserved 4:5 frame and a no-JavaScript image fallback. Its original width is preserved; responsive sizes are capped to the actual 448px container and quality is 60. It must appear on approach without shifting later sections.
- Local production verification: no Cairo font registration, only one hero image preload at high priority with matching candidates, no initial overview image, and the overview photo loads on approach. Build and 34 source/unit checks passed. Browser smoke tests are not a replacement for a Lighthouse score.
- Re-deploy the revision before measuring the public URL. Run three identical mobile Lighthouse audits in a clean profile with all extensions disabled, then compare the median. Do not assume an incognito window is extension-free. Never use special audit-user-agent behavior, hidden content, disabled animations only during audits, or arbitrary delayed hydration to inflate the score.
