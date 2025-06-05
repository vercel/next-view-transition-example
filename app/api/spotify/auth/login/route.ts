import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!process.env.SPOTIFY_CLIENT_ID) {
    return NextResponse.json(
      { error: "Missing Spotify credentials" },
      { status: 500 },
    );
  }

  const baseUrl = req.nextUrl.origin.includes("localhost")
    ? "http://127.0.0.1:3000"
    : req.nextUrl.origin;

  const scope = "streaming user-read-email user-read-private";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: baseUrl + "/api/spotify/auth/callback",
  });

  const redirectUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(redirectUrl);
}
