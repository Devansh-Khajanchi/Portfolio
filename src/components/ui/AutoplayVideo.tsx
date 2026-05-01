/* =============================================================================
   AUTOPLAY VIDEO
   Single source of truth for the project-page video pattern: muted, looping,
   inline-playing, no controls. Pass `fill` for absolute-positioned variants
   (gallery tiles, card covers); omit it for inline full-bleed sections.
   `controls` opts that one clip into native playback controls when needed.
   ============================================================================= */

type Props = {
  src: string;
  ariaLabel?: string;
  /** Decorative — set when the video is purely visual and the surrounding
      content carries the meaning. Skips the aria-label. */
  decorative?: boolean;
  /** Show native playback controls. Off by default per project convention. */
  controls?: boolean;
  /** Absolutely positioned, cover-fitted (for tiles/cards). */
  fill?: boolean;
  className?: string;
};

export default function AutoplayVideo({
  src,
  ariaLabel,
  decorative,
  controls = false,
  fill = false,
  className = "",
}: Props) {
  const fillClasses = fill
    ? "absolute inset-0 w-full h-full object-cover"
    : "block w-full h-auto";

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      controls={controls}
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative ? true : undefined}
      className={`${fillClasses} ${className}`.trim()}
    />
  );
}
