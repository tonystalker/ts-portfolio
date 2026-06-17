import { NextResponse } from "next/server";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token as string,
    }),
    // Required for Next.js to not aggressively cache this
    cache: 'no-store',
  });

  return response.json();
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
};

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
};

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return NextResponse.json({ isPlaying: false, message: "Missing Spotify Config" });
  }

  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      // Nothing is playing right now. Let's get the last played track.
      const recentResponse = await getRecentlyPlayed();
      if (recentResponse.status === 204 || recentResponse.status > 400) {
        return NextResponse.json({ isPlaying: false });
      }
      const recent = await recentResponse.json();
      if (!recent.items || recent.items.length === 0) {
        return NextResponse.json({ isPlaying: false });
      }
      
      const track = recent.items[0].track;
      return NextResponse.json({
        isPlaying: false,
        isRecent: true,
        title: track.name,
        artist: track.artists.map((_artist: any) => _artist.name).join(", "),
        albumImageUrl: track.album.images[0].url,
        songUrl: track.external_urls.spotify,
      });
    }

    const song = await response.json();
    if (song.item === null) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      isPlaying,
      isRecent: !isPlaying,
      title,
      artist,
      albumImageUrl,
      songUrl,
    });
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json({ isPlaying: false, message: "Server error" });
  }
}
