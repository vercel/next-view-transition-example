"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SpotifyCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = localStorage.getItem("spotify_auth_state");
    const error = searchParams.get("error");

    if (error) {
      setError(`Authentication error: ${error}`);
      return;
    }

    if (!code) {
      setError("No authorization code received");
      return;
    }

    if (state !== storedState) {
      setError("State mismatch. Possible CSRF attack.");
      return;
    }

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = window.location.origin + "/karaoke/callback";

    // Exchange the code for an access token
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:`)}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(`Token error: ${data.error}`);
          return;
        }

        localStorage.setItem("spotify_token", data.access_token);
        localStorage.removeItem("spotify_auth_state");
        router.push("/karaoke");
      })
      .catch((err) => {
        setError(`Failed to exchange code: ${err.message}`);
      });
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {error ? (
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <button
            onClick={() => router.push("/karaoke")}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Return to Karaoke
          </button>
        </div>
      ) : (
        <p>Authenticating with Spotify...</p>
      )}
    </div>
  );
}

export default function SpotifyCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <SpotifyCallbackContent />
    </Suspense>
  );
}
