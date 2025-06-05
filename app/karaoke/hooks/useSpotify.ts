"use client";

import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Song } from "../types";

export default function useSpotify(song: Song, spotifyToken: string) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const router = useRouter();

  const play = async () => {
    if (!player) {
      console.error("Spotify player not initialized");
      return;
    }

    try {
      // Start playback
      await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [song.spotifyUri],
        }),
      });
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const pauseToggle = async () => {
    if (!player) return;
    try {
      const playerState = await player.getCurrentState();
      if (playerState?.paused) {
        await player.resume();
      } else {
        await player.pause();
      }
    } catch (error) {
      console.error("Error pausing song:", error);
    }
  };

  const stop = async () => {
    if (!player) return;
    try {
      await player.pause();
      await player.seek(0);
    } catch (error) {
      console.error("Error stopping song:", error);
    }
  };

  async function transferPlayback(deviceId: string, token: string) {
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: false, // change to true if you want it to auto-play
      }),
    });
  }

  useEffect(() => {
    // Load Spotify Web Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Karaoke Player",
        getOAuthToken: (cb) => cb(spotifyToken),
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        setPlayer(player);
        transferPlayback(device_id, spotifyToken);
      });

      player.addListener("initialization_error", ({ message }) =>
        console.error("Init error", message),
      );
      player.addListener("authentication_error", ({ message }) =>
        console.error("Auth error", message),
      );
      player.addListener("account_error", ({ message }) =>
        console.error("Account error", message),
      );

      player.connect();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const login = () => router.push("/api/spotify/auth/login");

  const logout = () => {
    deleteCookie("spotify_token");
    if (player) {
      player.disconnect();
    }
  };

  return { play, pauseToggle, stop, login, logout, player };
}
