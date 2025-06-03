"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function SpotifyCallbackContent() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("spotify_token", token);
      router.push("/karaoke");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Authenticating with Spotify...</p>
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
