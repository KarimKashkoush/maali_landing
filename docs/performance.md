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
3. Make school links discoverable outside a dialog, and complete the placeholder stages, programs, and activities sections.
4. Test Core Web Vitals on production hosting and real mobile connections. A successful local build is not a PageSpeed score or proof of search ranking.
5. Verify media byte-range responses, caching, and HTTPS on the deployment host, then configure Search Console.

The page has an Arabic heading and description in server-rendered HTML, individual school metadata, and Open Graph titles/descriptions. Cairo remains a fallback font with preload disabled; Ping remains the primary font. Its WOFF2 files total 127,368 bytes instead of 317,016 bytes in OTF, with the same glyphs and typography.

## Local audits

Do not use `npm run dev` as the production performance baseline. Its unminified JavaScript, hot reload, React development checks, and development tools affect CPU time and transfer sizes.

Run `npm run build`, then `npm run start -- --port 3001`, and audit `http://localhost:3001/` in Lighthouse. Use the same mobile preset and throttling for comparisons and a clean browser session, so stored data/extensions do not skew the run. This runs locally and does not publish the site.

The hero image uses responsive Next.js optimization with eager loading and high fetch priority; the other logos use correctly sized, lazy-loaded images. The schools dialog library is requested on hover/focus/click instead of in the initial render. The decorative desktop cursor initializes after pointer movement. Named marquee and social containers use the accessible `group` role.

The hero wraps its image in a `picture` with a tiny inline source for the short-screen breakpoints where the logo is hidden. A media-qualified preload uses `getImageProps` and exactly the same `sizes`/`srcSet` as the rendered image, only on visible breakpoints. This brings discovery into the head without fetching a hidden or mismatched image. Verify both 390×667 (hidden) and 390×844 (visible) after changing these breakpoints.

The browser icon is 96×96 and 3,956 bytes instead of the original 93,146 bytes. `scripts/optimize-icon.mjs` rebuilds it from `assets/icon-source.png` without changing the full-resolution source. Navbar section links use native anchors (no route prefetch or redundant RSC requests for the same page); links to separate school pages still use Next Link. The language button's accessible name includes its visible EN/ع text.

Audit entries starting with `chrome-extension://` belong to the browser, not this site's bundle. Disable extensions in the audit profile rather than changing application code to address their minification or unused-JavaScript warnings. Some unused framework runtime and compatibility polyfills are expected; do not patch Next.js dependencies to remove them based only on a coverage estimate.

These changes reduce resource cost; they do not establish a Lighthouse score. Re-run the audit on the production build after changes, and repeat on the final host before release.

## Animation startup

ScrollSmoother and the brand timeline load on scroll intent (wheel, touch, scrolling keys, in-page links, or restored scroll position), not immediately during hydration. Native scrolling remains available while the modules load. The decorative hero pattern loads its animation on pointer interaction and measures tile positions only when needed. Reduced-motion handling and cleanup remain in place. These are normal progressive enhancements for every visitor, not Lighthouse-specific behavior.

Brand-story artwork is also mounted only when the section is within 200px of the viewport; the square grid reserves its layout before images load. Native `loading="lazy"` alone fetched these images within the browser's much larger near-viewport threshold during the initial audit. Text remains server-rendered and the hero logo stays eager/high-priority.

Run `node --experimental-strip-types --test tests/scroll-intent.test.mjs` to check initialization, cleanup, keyboard input, restored scrolling, and in-page navigation.
