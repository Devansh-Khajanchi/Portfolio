import Link from "next/link";
import Image from "next/image";
import type { PortfolioProject } from "@/types";
import { isVideoSrc } from "@/lib/media";
import AutoplayVideo from "@/components/ui/AutoplayVideo";

/* =============================================================================
   PROJECT CARD
   Linked tile used by the homepage Featured slot, the bento grid, and any
   end-of-page "More Projects" navigation. Renders project.cardImage
   (falling back to heroImage); auto-detects video vs. image source so a
   single field can hold either.
   ============================================================================= */

type Props = {
  project: PortfolioProject;
  className?: string;
  visualClassName?: string;
  priority?: boolean;
};

export default function ProjectCard({
  project,
  className = "",
  visualClassName = "aspect-[4/3]",
  priority,
}: Props) {
  const media = project.cardImage ?? project.heroImage;

  return (
    <Link
      href={`/${project.slug}`}
      className={`group flex h-full flex-col no-underline text-foreground ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--grey-200)] dark:bg-[var(--grey-800)] transition-opacity duration-200 group-hover:opacity-95 ${visualClassName}`}
      >
        {media ? (
          isVideoSrc(media) ? (
            <AutoplayVideo src={media} ariaLabel={project.title} fill />
          ) : (
            <Image
              src={media}
              alt={project.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )
        ) : null}
      </div>
      <div className="mt-4 md:mt-6">
        <h2
          style={{
            fontSize: "var(--text-h4)",
            fontWeight: "var(--weight-h4)",
            lineHeight: "var(--leading-h4)",
            letterSpacing: "var(--tracking-h4)",
          }}
        >
          {project.title}
        </h2>
        {project.summary ? (
          <p
            className="mt-2 text-foreground-muted"
            style={{
              fontSize: "var(--text-body-sm)",
              lineHeight: "var(--leading-body-sm)",
            }}
          >
            {project.summary}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
