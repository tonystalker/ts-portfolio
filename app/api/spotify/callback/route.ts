import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = "http://localhost:3000/api/spotify/callback";
  
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error, description: data.error_description });
    }

    return new NextResponse(`
      <html>
        <body style="font-family: monospace; background: #111; color: #0f0; padding: 2rem;">
          <h2>SUCCESS!</h2>
          <p>Copy the Refresh Token below and put it in your .env.local file:</p>
          <div style="padding: 1rem; background: #000; border: 1px solid #333; word-break: break-all;">
            <strong>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</strong>
          </div>
          <p>After saving the .env.local file, restart your dev server and your portfolio will be fully synced with Spotify.</p>
        </body>
      </html>
    `, {
      headers: { "Content-Type": "text/html" }
    });

  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch token", details: error.message });
  }
}
