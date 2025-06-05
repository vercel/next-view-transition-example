import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.BASE_URL) {
    return NextResponse.json(
      { error: "Missing Spotify credentials" },
      { status: 500 },
    );
  }

  const scope = "user-read-email user-read-private";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: process.env.BASE_URL + "/api/spotify/auth/callback",
  });

  const redirectUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(redirectUrl);
}
