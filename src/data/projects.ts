import type { PortfolioProject } from "@/types";

export const projects: PortfolioProject[] = [
  {
    slug: "noise-xyz",
    title: "Noise.xyz",
    year: "",
    role: "",
    summary: "",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "vida-mobile",
    title: "Vida Mobile Application",
    year: "",
    role: "",
    summary: "",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "vida-v1-dashboard",
    title: "VIDA V1 Dashboard",
    year: "",
    role: "",
    summary: "",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "descend",
    title: "Descend",
    year: "",
    role: "",
    summary: "",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "musee-du-louvre",
    title: "Musée du Louvre",
    year: "",
    role: "",
    summary: "",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "too-good-to-go-plus",
    title: "Too Good to Go +",
    year: "",
    role: "",
    summary: "",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "gladiator-display",
    title: "Gladiator Display",
    year: "",
    role: "",
    summary: "",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: PortfolioProject;
  next: PortfolioProject;
} | null {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return { prev, next };
}
