import type { PortfolioProject } from "@/types";

export const projects: PortfolioProject[] = [
  {
    slug: "noise-xyz",
    title: "Noise.xyz",
    year: "2026",
    role: "",
    client: "Noise Labs",
    summary:
      "Took Noise from 0→1, defining trading flows, funding, social features, and AI-driven trend insights.",
    cardImage: "/assets/images/projects/noise-xyz/sizzle-2.mp4",
    featured: true,
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "vida-mobile",
    title: "VIDA Mobile Application",
    year: "",
    role: "",
    summary: "Customer facing application for VIDA owners",
    cardImage: "/assets/images/projects/vida-mobile/cover.mp4",
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
    summary: "Digital instrument cluster interface for the VIDA V1",
    cardImage: "/assets/images/projects/vida-v1-dashboard/cover.mp4",
    cardBorder: true,
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "descend",
    title: "Descend™",
    year: "",
    role: "",
    summary: "Discover scuba diving spots with Descend",
    cardImage: "/assets/images/projects/descend/cover.jpg",
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
    summary:
      "A redesigned visual identity and motion graphics system for The Louvre, Paris",
    cardImage: "/assets/images/projects/musee-du-louvre/cover.mp4",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
  {
    slug: "too-good-to-go-plus",
    title: "Too Good To Go +",
    year: "",
    role: "",
    summary:
      "Adding a thoughtful new feature to the Too Good To Go application",
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
    summary: "Typeface design",
    problem: "",
    process: "",
    outcome: "",
    gallery: [],
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): PortfolioProject | undefined {
  return projects.find((p) => p.featured);
}

export function getNonFeaturedProjects(): PortfolioProject[] {
  return projects.filter((p) => !p.featured);
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
