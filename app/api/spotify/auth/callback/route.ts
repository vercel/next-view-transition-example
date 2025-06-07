import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return new NextResponse("No code in callback", { status: 400 });
  }

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return new NextResponse("Missing Spotify credentials", { status: 500 });
  }

  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");
  const baseUrl = req.nextUrl.origin.includes("localhost")
    ? "http://127.0.0.1:3000"
    : req.nextUrl.origin;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: baseUrl + "/api/spotify/auth/callback",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Spotify token error", data);
    return new NextResponse("Token exchange failed", { status: 500 });
  }

  const res = NextResponse.redirect(baseUrl + "/karaoke#pickup");
  res.cookies.set("spotify_token", data.access_token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: data.expires_in,
  });
  res.cookies.set("spotify_refresh_token", data.refresh_token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // Refresh tokens don't expire unless revoked
    maxAge: 365 * 24 * 60 * 60, // 1 year
  });

  return res;
}
