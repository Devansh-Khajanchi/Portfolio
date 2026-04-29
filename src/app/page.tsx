import Link from "next/link";

const sections = [
  { href: "/design",   label: "Work",     description: "Product design, systems, and visual work" },
  { href: "/projects", label: "Projects", description: "Coded apps, tools, and GitHub" },
  { href: "/creative", label: "Play",     description: "Photography, motion, and side experiments" },
  { href: "/about",    label: "About",    description: "Background, process, and contact" },
] as const;

/**
 * 4-item 2-col grid border map:
 *   [0][1]
 *   [2][3]
 * Mobile (1 col): bottom border on 0,1,2
 * md+ (2 col):    bottom border on 0,1; right border on 0,2
 */
function itemBorderClass(i: number): string {
  const c: string[] = [];
  if (i < 3)        c.push("border-b border-border");           // mobile bottom rule
  if (i % 2 === 0)  c.push("md:border-r");                       // md+ left column
  if (i < 2)        c.push("md:border-b");                       // md+ top row
  else if (i === 2) c.push("md:border-b-0");                     // md+: undo mobile bottom
  return c.join(" ");
}

export default function Home() {
  return (
    <div className="pt-[var(--height-nav)]">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="flex flex-col justify-end min-h-[calc(85vh-var(--height-nav))] px-6 md:px-8 lg:px-12 pb-10 md:pb-16 lg:pb-20 gap-8 md:gap-10 border-b border-border">
        <h1
          className="text-foreground"
          style={{
            fontSize: "var(--text-display)",
            fontWeight: "var(--weight-display)",
            lineHeight: "var(--leading-display)",
            letterSpacing: "var(--tracking-display)",
          }}
        >
          Building AI-driven<br />
          Products{" "}
          <span style={{ color: "var(--secondary)" }}>+</span>
          {" "}Experiences
          <span style={{ color: "var(--primary)" }}>.</span>
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

      {/* ── Section index ────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {sections.map(({ href, label, description }, i) => (
          <Link
            key={href}
            href={href}
            className={`block px-6 md:px-8 lg:px-12 py-8 md:py-10 lg:py-12 no-underline text-foreground ${itemBorderClass(i)}`}
          >
            <h2
              className="mb-3"
              style={{
                fontSize: "var(--text-h3)",
                fontWeight: "var(--weight-h3)",
                lineHeight: "var(--leading-h3)",
              }}
            >
              {label}
            </h2>
            <p
              className="text-foreground-muted"
              style={{ fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body-sm)" }}
            >
              {description}
            </p>
          </Link>
        ))}
      </section>

    </div>
  );
}
