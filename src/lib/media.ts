/* =============================================================================
   MEDIA UTILITIES
   Helpers for distinguishing image vs. video sources so call sites can render
   the correct element without each one duplicating extension-matching logic.
   ============================================================================= */

const VIDEO_EXTENSIONS = /\.(mp4|mov|webm|ogv)$/i;

export function isVideoSrc(src: string): boolean {
  return VIDEO_EXTENSIONS.test(src);
}
