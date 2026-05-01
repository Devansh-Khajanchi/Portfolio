export type DesignProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
};

export type CodedProject = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  imageUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type CreativeWork = {
  id: string;
  title: string;
  category: "sketch" | "artwork" | "photography";
  imageUrl: string;
  description?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  controls?: boolean;
};

export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  year: string;
  role: string;
  client?: string;
  tools?: string[];
  timeline?: string;
  summary: string;
  heroImage?: string;
  cardImage?: string;
  cardBorder?: boolean;
  featured?: boolean;
  problem: string;
  process: string;
  outcome: string;
  gallery: GalleryImage[];
  links?: PortfolioLink[];
};
