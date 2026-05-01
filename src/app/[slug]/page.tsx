import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectPage from "@/components/sections/ProjectPage";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects
    .filter((p) => p.slug !== "noise-xyz")
    .map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Devansh Khajanchi`,
    description: project.summary || undefined,
  };
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const adjacent = getAdjacentProjects(slug);
  if (!adjacent) notFound();

  return <ProjectPage project={project} prev={adjacent.prev} next={adjacent.next} />;
}
