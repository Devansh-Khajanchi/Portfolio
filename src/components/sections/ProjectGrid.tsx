import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/data/projects";

function itemBorderClass(i: number, total: number): string {
  const c: string[] = ["border-border"];
  const isLastRowDesktop = i >= total - (total % 2 === 0 ? 2 : 1);
  const hasRightNeighbor = i % 2 === 0 && i + 1 < total;
  if (i < total - 1) c.push("border-b");
  if (hasRightNeighbor) c.push("md:border-r");
  if (!isLastRowDesktop) c.push("md:border-b");
  else c.push("md:border-b-0");
  return c.join(" ");
}

export default function ProjectGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/${project.slug}`}
          className={`group block px-6 md:px-8 lg:px-12 py-8 md:py-10 lg:py-12 no-underline text-foreground ${itemBorderClass(i, projects.length)}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2
                className="mb-3"
                style={{
                  fontSize: "var(--text-h3)",
                  fontWeight: "var(--weight-h3)",
                  lineHeight: "var(--leading-h3)",
                }}
              >
                {project.title}
              </h2>
              {project.summary ? (
                <p
                  className="text-foreground-muted"
                  style={{
                    fontSize: "var(--text-body-sm)",
                    lineHeight: "var(--leading-body-sm)",
                  }}
                >
                  {project.summary}
                </p>
              ) : null}
            </div>
            <ArrowUpRight
              size={20}
              weight="bold"
              className="shrink-0 text-foreground-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </div>
        </Link>
      ))}
    </section>
  );
}
