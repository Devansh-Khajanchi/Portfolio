import { getFeaturedProject } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedSection() {
  const project = getFeaturedProject();
  if (!project) return null;

  return (
    <section className="px-6 md:px-8 lg:px-12 pt-12 md:pt-16 pb-12 md:pb-16">
      <h2
        className="mb-6 md:mb-8 text-foreground"
        style={{
          fontSize: "var(--text-h6)",
          fontWeight: "var(--weight-h6)",
          lineHeight: "var(--leading-h6)",
          letterSpacing: "var(--tracking-h6)",
        }}
      >
        Featured
      </h2>
      <ProjectCard
        project={project}
        visualClassName="aspect-[16/9]"
        priority
      />
    </section>
  );
}
