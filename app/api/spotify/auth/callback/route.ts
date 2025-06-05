import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return new NextResponse("No code in callback", { status: 400 });
  }

  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.BASE_URL
  ) {
    return new NextResponse("Missing Spotify credentials", { status: 500 });
  }

  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.BASE_URL + "/api/spotify/auth/callback",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Spotify token error", data);
    return new NextResponse("Token exchange failed", { status: 500 });
  }

  const res = NextResponse.redirect(process.env.BASE_URL + "/karaoke");
  res.cookies.set("spotify_token", data.access_token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: data.expires_in,
  });

  return res;
}
