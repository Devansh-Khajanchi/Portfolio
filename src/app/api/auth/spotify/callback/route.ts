// Receives ?code=... from Spotify, exchanges it for a refresh token,
// and renders an HTML page that shows the token so the user can paste it
// into .env.local. One-time setup; never auto-writes the file.

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function pageShell(body: string): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Spotify connected</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; max-width: 640px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.55; color: #111; background: #fafafa; }
      h1 { font-size: 1.5rem; margin: 0 0 .5rem; }
      .ok { color: #15803d; }
      .err { color: #b91c1c; }
      pre { background: #111; color: #f4f4f5; padding: 1rem 1.25rem; border-radius: 8px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .9rem; }
      ol { padding-left: 1.25rem; } li { margin: .25rem 0; }
      .muted { color: #525252; font-size: .9rem; }
      a { color: #2563eb; }
    </style>
  </head>
  <body>${body}</body>
</html>`;
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const oauthError = url.searchParams.get("error");

  if (oauthError) {
    return pageShell(
      `<h1 class="err">Authorization denied</h1><p>Spotify said: <code>${escapeHtml(oauthError)}</code></p>`,
    );
  }
  if (!code) {
    return pageShell(
      `<h1 class="err">Missing code</h1><p>Spotify didn't return a code. Try the login link again.</p>`,
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return pageShell(
      `<h1 class="err">Spotify not configured</h1><p>SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET missing in .env.local.</p>`,
    );
  }

  // Must match exactly what was sent in /login (and what's registered in
  // Spotify). Same Host-header derivation as login route.
  const host = request.headers.get("host") ?? "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  const redirectUri = `${proto}://${host}/api/auth/spotify/callback`;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errBody = await res.text();
    return pageShell(
      `<h1 class="err">Token exchange failed</h1><p>HTTP ${res.status}</p><pre>${escapeHtml(errBody)}</pre>`,
    );
  }

  const data = (await res.json()) as { refresh_token: string };

  return pageShell(`
    <h1 class="ok">✓ Authorized</h1>
    <p>Spotify issued a refresh token. Add this line to your <code>.env.local</code>:</p>
    <pre>SPOTIFY_REFRESH_TOKEN=${escapeHtml(data.refresh_token)}</pre>
    <p><strong>Then:</strong></p>
    <ol>
      <li>Save <code>.env.local</code></li>
      <li>Restart <code>npm run dev</code> (env vars only load on startup)</li>
      <li>Visit <a href="/creative">/creative</a> → click the green Music card</li>
    </ol>
    <p class="muted">This token is long-lived — Spotify won't make you log in again unless you revoke access in your Spotify account settings.</p>
  `);
}
