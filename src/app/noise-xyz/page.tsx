import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getAdjacentProjects, getProjectBySlug } from "@/data/projects";
import AutoplayVideo from "@/components/ui/AutoplayVideo";
import ProjectCard from "@/components/sections/ProjectCard";

/* =============================================================================
   NOISE.XYZ — bespoke project page
   The shared ProjectPage template can't render this layout (overlapping
   compositions, full-bleed video sequences, two-column tiles with mixed
   media). This file owns the layout end-to-end while still pulling
   cross-site metadata (title / year / client / cardImage) from
   src/data/projects.ts so it stays in sync with the homepage card and any
   prev/next nav that lands here.
   ============================================================================= */

const SLUG = "noise-xyz";
const ASSET = `/assets/images/projects/${SLUG}`;

// Project-specific copy tied to this page's hero composition. The cross-site
// project title ("Noise.xyz") still lives in data/projects.ts; the long-form
// display title is hero-only and stays here.
const HERO = {
  title: ["Designing Noise's", "Trend Trading Platform 0→1"] as const,
  location: "New York, NY",
  liveUrl: "https://app.noise.xyz",
  liveLabel: "app.noise.xyz",
};

// Two-column trend-line video pair. Half-width tiles like the Join + OpenClaw row.
const TWO_COL_VIDEOS = [
  { file: "tr-11.mp4", label: "Trend line variant 11" },
  { file: "tr-17.mp4", label: "Trend line variant 17" },
];

// Stacked full-bleed video sequence near the end of the page.
const FULL_BLEED_VIDEOS = [
  { file: "discover-recording.mp4",  label: "Noise Discover page recording" },
  { file: "dashboard-recording.mp4", label: "Noise dashboard recording" },
  { file: "billboard.mp4",           label: "Noise Stay Relevant billboard mockup" },
];

export const metadata: Metadata = {
  title: "Noise.xyz — Devansh Khajanchi",
  description: "Designing Noise's Trend Trading Platform 0→1",
};

export default function NoiseXyzPage() {
  const project = getProjectBySlug(SLUG);
  if (!project) notFound();
  const adjacent = getAdjacentProjects(SLUG);
  if (!adjacent) notFound();
  const { prev, next } = adjacent;

  const subtitle = [project.client, HERO.location, project.year]
    .filter(Boolean)
    .join("  |  ");

  return (
    <article className="pt-[var(--height-nav)]">
      {/* ── 1. HERO ─────────────────────────────────────────────────────────────
          Two-column intro: long-form display title + meta line on the left;
          NOISE° wordmark + live URL on the right. Adapts to light/dark via
          --background / --foreground tokens; the logo SVG flips between the
          black/white variants on the .dark class. */}
      <section className="bg-background text-foreground px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-24 pb-12 md:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 items-end">
          <div>
            <h1
              style={{
                fontSize: "var(--text-h2)",
                fontWeight: "var(--weight-h2)",
                lineHeight: "var(--leading-h2)",
                letterSpacing: "var(--tracking-h2)",
              }}
            >
              {HERO.title[0]}
              <br />
              {HERO.title[1]}
            </h1>
            <p
              className="mt-6 text-foreground-muted"
              style={{
                fontSize: "var(--text-body-sm)",
                lineHeight: "var(--leading-body-sm)",
              }}
            >
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <Image
              src={`${ASSET}/noise-logotype-black.svg`}
              alt="Noise"
              width={280}
              height={82}
              priority
              className="h-auto w-[180px] md:w-[240px] lg:w-[280px] block dark:hidden"
            />
            <Image
              src={`${ASSET}/noise-logotype-white.svg`}
              alt=""
              aria-hidden
              width={280}
              height={82}
              priority
              className="h-auto w-[180px] md:w-[240px] lg:w-[280px] hidden dark:block"
            />
            <a
              href={HERO.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-foreground-muted hover:text-foreground inline-flex items-center gap-1 no-underline"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {HERO.liveLabel}
              <ArrowUpRight size={12} weight="bold" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TREND WALL VIDEO — full-bleed ────────────────────────────────────
          Always black: the video itself plays on dark, regardless of theme. */}
      <section className="bg-black">
        <AutoplayVideo
          src={`${ASSET}/heat-map-turbulent-2.mp4`}
          ariaLabel="Noise trend heat map animation"
        />
      </section>

      {/* ── 3. DASHBOARD SCREENSHOT ─────────────────────────────────────────── */}
      <section className="bg-[var(--surface-raised)] px-6 md:px-12 lg:px-24 py-12 md:py-16 lg:py-24">
        <div className="relative w-full max-w-6xl mx-auto aspect-[16/10]">
          <Image
            src={`${ASSET}/dashboard.png`}
            alt="Noise dashboard with featured trends and Peptides chart"
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 1100px, 100vw"
          />
        </div>
      </section>

      {/* ── 4. THREE-UP MOBILE SCREENS ──────────────────────────────────────────
          iPhone-proportionate corner radius and a soft elevation; the wrapper
          shape is identical for all three so we map. */}
      <section className="bg-[var(--surface-raised)] px-6 md:px-12 lg:px-24 pb-12 md:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="relative w-full max-w-xs mx-auto aspect-[9/19.5] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-medium)]"
            >
              <Image
                src={`${ASSET}/mobile-${n}.png`}
                alt={`Noise mobile app screen ${n}`}
                fill
                className="object-contain"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. SHARE-PNL COMPOSITION ────────────────────────────────────────────
          Stacked on mobile; on desktop the modal floats top-left and the
          giant card anchors bottom-right (overflow-hidden lets it bleed off
          the right edge for the cropped look). */}
      <section className="bg-[var(--surface-raised)] overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16 lg:py-24">
          <div className="flex flex-col gap-8 md:block md:relative md:min-h-[520px] lg:min-h-[640px]">
            <div className="relative w-[70%] max-w-sm md:absolute md:top-0 md:left-0 lg:left-12 md:w-[32%] lg:w-[28%] z-10 md:max-w-none">
              <Image
                src={`${ASSET}/share-pnl-modal.png`}
                alt="Share your PnL modal"
                width={896}
                height={822}
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="relative w-full md:absolute md:right-0 md:bottom-0 lg:right-[-4%] md:w-[68%] lg:w-[72%]">
              <Image
                src={`${ASSET}/cursor-pnl-card.png`}
                alt="Cursor LONG +$81.67 +45.15% PnL share card"
                width={3200}
                height={1800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TWO-COL TILES — Join + OpenClaw ──────────────────────────────────
          Left tile: bubble heat-map video as background, near-opaque white
          scrim, "Join the Conversation" pill centered.
          Right tile: brand yellow surface (--noise-yellow), OpenClaw trade
          card centered. The white scrim stays literal-white in both themes —
          it's the project's intentional faded-thumbnail look, not a surface. */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-[var(--surface-raised)]">
          <AutoplayVideo src={`${ASSET}/heat-map-bubble.mp4`} decorative fill />
          <div className="absolute inset-0 bg-white/85" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <Image
              src={`${ASSET}/join-button.png`}
              alt="Join the conversation"
              width={1086}
              height={214}
              className="w-[60%] max-w-sm h-auto"
            />
          </div>
        </div>
        <div
          className="relative aspect-[4/3] md:aspect-square overflow-hidden flex items-center justify-center p-8 md:p-12"
          style={{ backgroundColor: "var(--noise-yellow)" }}
        >
          <div className="relative w-full max-w-[55%] aspect-[1018/1404]">
            <Image
              src={`${ASSET}/openclaw-card.png`}
              alt="OpenClaw trade card"
              fill
              className="object-contain"
              sizes="(min-width: 768px) 30vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── 7. TWO-COL TREND-LINE VIDEO PAIR ──────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {TWO_COL_VIDEOS.map(({ file, label }) => (
          <div
            key={file}
            className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-black"
          >
            <AutoplayVideo src={`${ASSET}/${file}`} ariaLabel={label} fill />
          </div>
        ))}
      </section>

      {/* ── 8. FULL-BLEED VIDEO SEQUENCE — Discover, Dashboard, Billboard ───── */}
      {FULL_BLEED_VIDEOS.map(({ file, label }) => (
        <section key={file} className="bg-black">
          <AutoplayVideo src={`${ASSET}/${file}`} ariaLabel={label} />
        </section>
      ))}

      {/* ── 9. MORE PROJECTS ────────────────────────────────────────────────────
          End-of-page nav. Reuses ProjectCard at 16:9 to match this page's
          visual rhythm. Auto-derived from projects.ts array order (prev/next);
          swap to curated picks by passing any two projects to the map. */}
      <section className="border-t border-border bg-background">
        <div className="px-6 md:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 text-center">
          <h2
            style={{
              fontSize: "var(--text-h3)",
              fontWeight: "var(--weight-h3)",
              lineHeight: "var(--leading-h3)",
            }}
          >
            More Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-8 lg:px-12 pb-16 md:pb-24">
          {[prev, next].map((p) => (
            <ProjectCard key={p.slug} project={p} visualClassName="aspect-[16/9]" />
          ))}
        </div>
      </section>
    </article>
  );
}
