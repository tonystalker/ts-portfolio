import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID || "43714984325044788e76eb9c73cd9ce1";
  const redirect_uri = "http://localhost:3000/api/spotify/callback";
  const scope = "user-read-currently-playing user-read-recently-played";

  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.append("client_id", client_id);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("redirect_uri", redirect_uri);
  url.searchParams.append("scope", scope);

  return NextResponse.redirect(url.toString());
}
