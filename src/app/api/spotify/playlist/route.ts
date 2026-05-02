import type { SpotifyPlaylist, SpotifyTrack } from "@/types";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const PLAYLIST_URL = "https://api.spotify.com/v1/playlists";

type CachedToken = { token: string; expiresAt: number };
let cached: CachedToken | null = null;
let inFlight: Promise<string> | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("missing-credentials");
  }

  const now = Date.now();
  if (cached && cached.expiresAt > now + 30_000) return cached.token;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`token-${res.status}: ${body.slice(0, 120)}`);
    }
    const data = (await res.json()) as { access_token: string; expires_in: number };
    cached = {
      token: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
    return data.access_token;
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}

type RawTrackItem = {
  track: {
    id: string;
    name: string;
    duration_ms: number;
    preview_url: string | null;
    external_urls: { spotify: string };
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string; width: number; height: number }[];
    };
  } | null;
};

type RawPlaylistMeta = {
  name: string;
  description: string;
  external_urls: { spotify: string };
  images: { url: string }[];
};

type RawTracksResponse = {
  items: RawTrackItem[];
};

export async function GET() {
  const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
  if (!playlistId) {
    return Response.json(
      { error: "Spotify not configured (SPOTIFY_PLAYLIST_ID missing)" },
      { status: 500 },
    );
  }

  let token: string;
  try {
    token = await getAccessToken();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "token-error";
    const hint = msg.includes("missing-credentials")
      ? "Run /api/auth/spotify/login first to get a refresh token."
      : msg.includes("invalid_grant")
      ? "Refresh token rejected. Re-run /api/auth/spotify/login."
      : "";
    return Response.json(
      { error: `Spotify auth failed: ${msg}${hint ? ` — ${hint}` : ""}` },
      { status: 500 },
    );
  }

  // Two requests in parallel: playlist metadata + tracks.
  // Spotify's /playlists/{id} no longer returns the tracks field reliably,
  // so we use the dedicated /tracks subresource.
  const headers = { Authorization: `Bearer ${token}` };
  const [metaRes, tracksRes] = await Promise.all([
    fetch(`${PLAYLIST_URL}/${playlistId}`, {
      headers,
      next: { revalidate: 3600 },
    }),
    fetch(`${PLAYLIST_URL}/${playlistId}/tracks?limit=100`, {
      headers,
      next: { revalidate: 3600 },
    }),
  ]);

  if (metaRes.status === 404 || tracksRes.status === 404) {
    return Response.json(
      { error: "Playlist not found — make sure it's public on Spotify" },
      { status: 404 },
    );
  }
  if (!metaRes.ok) {
    return Response.json(
      { error: `Spotify upstream (meta) ${metaRes.status}` },
      { status: 502 },
    );
  }
  if (!tracksRes.ok) {
    return Response.json(
      { error: `Spotify upstream (tracks) ${tracksRes.status}` },
      { status: 502 },
    );
  }

  const meta = (await metaRes.json()) as RawPlaylistMeta;
  const tracksRaw = (await tracksRes.json()) as RawTracksResponse;

  const tracks: SpotifyTrack[] = tracksRaw.items
    .filter((it): it is RawTrackItem & { track: NonNullable<RawTrackItem["track"]> } => Boolean(it.track))
    .map((it) => ({
      id: it.track.id,
      name: it.track.name,
      artists: it.track.artists.map((a) => a.name),
      album: it.track.album.name,
      albumImage: it.track.album.images[0]?.url ?? null,
      durationMs: it.track.duration_ms,
      externalUrl: it.track.external_urls.spotify,
      previewUrl: it.track.preview_url,
    }));

  const payload: SpotifyPlaylist = {
    name: meta.name,
    description: meta.description,
    image: meta.images[0]?.url ?? null,
    externalUrl: meta.external_urls.spotify,
    tracks,
  };

  return Response.json(payload);
}
