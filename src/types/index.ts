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
