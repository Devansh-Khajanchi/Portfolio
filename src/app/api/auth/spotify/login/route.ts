// One-time OAuth setup for the curated playlist on /creative.
// Visit this in a browser → Spotify auth screen → callback issues a refresh token.

const SCOPES = "playlist-read-private playlist-read-collaborative";

export function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return Response.json(
      { error: "SPOTIFY_CLIENT_ID missing in .env.local" },
      { status: 500 },
    );
  }

  // Read host from header — Next 16's request.url normalizes to "localhost"
  // even when the request actually came in on 127.0.0.1, which mismatches
  // whatever you registered in Spotify.
  const host = request.headers.get("host") ?? "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  const redirectUri = `${proto}://${host}/api/auth/spotify/callback`;

  const auth = new URL("https://accounts.spotify.com/authorize");
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("client_id", clientId);
  auth.searchParams.set("scope", SCOPES);
  auth.searchParams.set("redirect_uri", redirectUri);

  return Response.redirect(auth.toString(), 302);
}
