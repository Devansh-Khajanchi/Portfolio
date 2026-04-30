import Link from "next/link";
import ProjectGrid from "@/components/sections/ProjectGrid";

const secondaryLinks = [
  { href: "/creative", label: "Play",   external: false },
  { href: "/about",    label: "About",  external: false },
  { href: "https://github.com/Devansh-Khajanchi", label: "GitHub", external: true },
  { href: "/devansh-khajanchi-resume-2026.pdf",   label: "Resume", external: true },
];

export default function Home() {
  return (
    <div className="pt-[var(--height-nav)]">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex flex-col justify-end min-h-[calc(85vh-var(--height-nav))] px-6 md:px-8 lg:px-12 pb-10 md:pb-16 lg:pb-20 gap-8 md:gap-10 border-b border-border">
        <h1
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--weight-display)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
          }}
        >
          <span className="block text-foreground-muted">Devansh Khajanchi</span>
          <span className="block text-foreground">Designer at Noise.xyz</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-3 md:gap-20 lg:gap-32">
          <p
            className="text-foreground-muted"
            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
          >
            Senior Product Design Engineer.<br />
            Currently based in New York City.
          </p>
          <p
            className="text-foreground-muted"
            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
          >
            Designed Noise.xyz
          </p>
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────── */}
      <ProjectGrid />

      {/* ── Secondary links ──────────────────────────────── */}
      <section className="px-6 md:px-8 lg:px-12 py-8 md:py-10 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-3">
        {secondaryLinks.map(({ href, label, external }) =>
          external ? (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-foreground-muted no-underline hover:text-foreground"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {label}
            </a>
          ) : (
            <Link
              key={label}
              href={href}
              className="text-foreground-muted no-underline hover:text-foreground"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {label}
            </Link>
          ),
        )}
      </section>

    </div>
  );
}
