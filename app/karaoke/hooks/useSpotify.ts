"use client";

import { Song } from "@/app/types";
import { deleteCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

type PlayerState = "idle" | "playing" | "paused" | "stopped";

export default function useSpotify(
  song: Song,
  spotifyToken: string | undefined,
) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState();
  const [playerState, setPlayerState] = useState<PlayerState>("idle");

  const play = async () => {
    if (!player) {
      console.error("Spotify player not initialized");
      return;
    }

    if (playerState === "playing") return;

    try {
      // Start playback
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: [song.spotifyUri],
          }),
        },
      );
      setPlayerState("playing");
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const pauseToggle = async () => {
    if (!player) return;
    try {
      if (playerState === "paused") {
        await player.resume();
        setPlayerState("playing");
      } else {
        await player.pause();
        setPlayerState("paused");
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
      setPlayerState("stopped");
    } catch (error) {
      console.error("Error stopping song:", error);
    }
  };

  useEffect(() => {
    if (!spotifyToken) return;
    // Load Spotify Web Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Karaoke Player",
        getOAuthToken: (cb) => cb(spotifyToken ?? ""),
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        setPlayer(player);
        setDeviceId(device_id);
        setPlayerState("idle");
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

  const logout = () => {
    deleteCookie("spotify_token");
    if (player) {
      player.disconnect();
    }
    setPlayerState("idle");
  };

  return { play, pauseToggle, stop, logout, player, playerState };
}
