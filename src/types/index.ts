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

export type PlaygroundItem = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  /** "media" (default): show src as image/video. "music": modal renders MusicPlaylistView. "link": tap opens href in a new tab; modal is bypassed. */
  kind?: "media" | "music" | "link";
  /** Path under /public — .mp4/.mov/.webm/.ogv render as <video>, anything else (incl. .gif) as <img>. */
  src?: string;
  alt?: string;
  /** Fallback solid color when no `src` is provided. */
  bg?: string;
  fg?: string;
  href?: string;
};

export type CuratedTrack = {
  title: string;
  artists: string[];
  album?: string;
  /** Public CDN URL — easiest source is Spotify's i.scdn.co */
  albumImage: string;
  /** External "open in service" link (Spotify / Apple / YouTube) */
  href: string;
  /** YouTube video ID (the v=... part of a YouTube URL). Enables in-modal playback. */
  youtubeId?: string;
  durationMs?: number;
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: string[];
  album: string;
  albumImage: string | null;
  durationMs: number;
  externalUrl: string;
  previewUrl: string | null;
};

export type SpotifyPlaylist = {
  name: string;
  description: string;
  image: string | null;
  externalUrl: string;
  tracks: SpotifyTrack[];
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
