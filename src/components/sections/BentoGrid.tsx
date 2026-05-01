import { getNonFeaturedProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const layout: Record<string, string> = {
  "vida-mobile":
    "md:col-start-1 md:col-end-9 md:row-start-1 md:row-end-3",
  "vida-v1-dashboard":
    "md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-2",
  "musee-du-louvre":
    "md:col-start-9 md:col-end-13 md:row-start-2 md:row-end-3",
  "too-good-to-go-plus":
    "md:col-start-1 md:col-end-5 md:row-start-3 md:row-end-4",
  descend:
    "md:col-start-5 md:col-end-13 md:row-start-3 md:row-end-5",
  "gladiator-display":
    "md:col-start-1 md:col-end-5 md:row-start-4 md:row-end-5",
};

export default function BentoGrid() {
  const projects = getNonFeaturedProjects();

  return (
    <section
      className="
        px-6 md:px-8 lg:px-12
        pb-16 md:pb-24
        grid gap-y-10 md:gap-x-6 md:gap-y-12
        grid-cols-1
        md:grid-cols-12 md:grid-rows-[repeat(4,minmax(180px,1fr))]
      "
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          className={layout[project.slug] ?? ""}
          visualClassName="flex-1 min-h-[200px] md:min-h-0"
        />
      ))}
    </section>
  );
}
