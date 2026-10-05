import small from "@/assets/school-mark/mark-96.webp";
import medium from "@/assets/school-mark/mark-256.webp";
import large from "@/assets/school-mark/mark-384.webp";
import retina from "@/assets/school-mark/mark-800.webp";

// Pre-encoded, hashed CDN assets: no on-demand image optimizer on the LCP path.
export const schoolMark = {
  src: medium.src,
  small: small.src,
  loading: large.src,
  srcSet: `${small.src} 96w, ${medium.src} 256w, ${large.src} 384w, ${retina.src} 800w`,
};
export const heroMarkSizes = "(min-width: 1126px) and (max-height: 760px) 304px, (min-width: 1024px) and (max-height: 760px) 27vw, (min-width: 1291px) 400px, (min-width: 1024px) 31vw, (min-width: 565px) 192px, 34vw";
export const heroMarkMedia = "(min-height: 740px), (min-width: 1024px) and (min-height: 501px)";
