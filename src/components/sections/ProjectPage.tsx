import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { PortfolioProject } from "@/types";

type Props = {
  project: PortfolioProject;
  prev: PortfolioProject;
  next: PortfolioProject;
};

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-foreground-muted uppercase"
        style={{
          fontSize: "var(--text-label)",
          fontWeight: "var(--weight-medium)",
          letterSpacing: "var(--tracking-wider)",
        }}
      >
        {label}
      </span>
      <span
        className="text-foreground"
        style={{
          fontSize: "var(--text-body-sm)",
          lineHeight: "var(--leading-body-sm)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function NarrativeBlock({ heading, body }: { heading: string; body: string }) {
  if (!body) return null;
  return (
    <section className="px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 border-b border-border">
      <h2
        className="mb-6 text-foreground"
        style={{
          fontSize: "var(--text-h2)",
          fontWeight: "var(--weight-h2)",
          lineHeight: "var(--leading-h2)",
        }}
      >
        {heading}
      </h2>
      <p
        className="text-foreground-muted max-w-3xl whitespace-pre-line"
        style={{
          fontSize: "var(--text-body)",
          lineHeight: "var(--leading-body)",
        }}
      >
        {body}
      </p>
    </section>
  );
}

export default function ProjectPage({ project, prev, next }: Props) {
  const hasMeta =
    project.client || (project.tools && project.tools.length > 0) || project.timeline;

  return (
    <article className="pt-[var(--height-nav)]">
      {/* Hero */}
      <section className="px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20 pb-10 md:pb-12 lg:pb-16 border-b border-border">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 md:mb-10 text-foreground-muted no-underline hover:text-foreground"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          <ArrowLeft size={14} weight="bold" aria-hidden />
          All work
        </Link>

        <h1
          className="text-foreground mb-6"
          style={{
            fontSize: "var(--text-h1)",
            fontWeight: "var(--weight-h1)",
            lineHeight: "var(--leading-h1)",
            letterSpacing: "var(--tracking-h1)",
          }}
        >
          {project.title}
          <span style={{ color: "var(--primary)" }}>.</span>
        </h1>

        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8">
          {project.year ? (
            <span
              className="text-foreground-muted"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {project.year}
            </span>
          ) : null}
          {project.role ? (
            <span
              className="text-foreground-muted"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {project.role}
            </span>
          ) : null}
        </div>

        {project.summary ? (
          <p
            className="text-foreground max-w-3xl"
            style={{
              fontSize: "var(--text-body-lg)",
              lineHeight: "var(--leading-body-lg)",
            }}
          >
            {project.summary}
          </p>
        ) : null}
      </section>

      {/* Meta strip */}
      {hasMeta || (project.links && project.links.length > 0) ? (
        <section className="px-6 md:px-8 lg:px-12 py-8 md:py-10 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {project.client ? <MetaCell label="Client" value={project.client} /> : null}
            {project.tools && project.tools.length > 0 ? (
              <MetaCell label="Tools" value={project.tools.join(", ")} />
            ) : null}
            {project.timeline ? (
              <MetaCell label="Timeline" value={project.timeline} />
            ) : null}
            {project.links && project.links.length > 0 ? (
              <div className="flex flex-col gap-1">
                <span
                  className="text-foreground-muted uppercase"
                  style={{
                    fontSize: "var(--text-label)",
                    fontWeight: "var(--weight-medium)",
                    letterSpacing: "var(--tracking-wider)",
                  }}
                >
                  Links
                </span>
                <ul className="flex flex-col gap-1">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-foreground no-underline hover:text-primary"
                        style={{
                          fontSize: "var(--text-body-sm)",
                          lineHeight: "var(--leading-body-sm)",
                        }}
                      >
                        {link.label}
                        <ArrowUpRight size={12} weight="bold" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Hero image */}
      {project.heroImage ? (
        <section className="px-6 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20 border-b border-border">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1100px, 100vw"
              priority
            />
          </div>
        </section>
      ) : null}

      {/* Narrative */}
      <NarrativeBlock heading="Problem" body={project.problem} />
      <NarrativeBlock heading="Process" body={project.process} />
      <NarrativeBlock heading="Outcome" body={project.outcome} />

      {/* Gallery */}
      {project.gallery.length > 0 ? (
        <section className="px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 border-b border-border">
          <h2
            className="mb-8 text-foreground"
            style={{
              fontSize: "var(--text-h2)",
              fontWeight: "var(--weight-h2)",
              lineHeight: "var(--leading-h2)",
            }}
          >
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {project.gallery.map((img) => (
              <figure key={img.src} className="flex flex-col gap-2">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md bg-surface-raised">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                {img.caption ? (
                  <figcaption
                    className="text-foreground-muted"
                    style={{
                      fontSize: "var(--text-label)",
                      lineHeight: "var(--leading-body-sm)",
                    }}
                  >
                    {img.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* Prev / Next */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <Link
          href={`/${prev.slug}`}
          className="block px-6 md:px-8 lg:px-12 py-8 md:py-10 no-underline text-foreground border-b md:border-b-0 md:border-r border-border"
        >
          <span
            className="flex items-center gap-2 text-foreground-muted mb-2"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-wider)" }}
          >
            <ArrowLeft size={14} weight="bold" aria-hidden /> Previous
          </span>
          <span
            style={{
              fontSize: "var(--text-h4)",
              fontWeight: "var(--weight-h4)",
              lineHeight: "var(--leading-h4)",
            }}
          >
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/${next.slug}`}
          className="block px-6 md:px-8 lg:px-12 py-8 md:py-10 no-underline text-foreground"
        >
          <span
            className="flex items-center justify-end gap-2 text-foreground-muted mb-2"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-wider)" }}
          >
            Next <ArrowRight size={14} weight="bold" aria-hidden />
          </span>
          <span
            className="block text-right"
            style={{
              fontSize: "var(--text-h4)",
              fontWeight: "var(--weight-h4)",
              lineHeight: "var(--leading-h4)",
            }}
          >
            {next.title}
          </span>
        </Link>
      </section>
    </article>
  );
}
