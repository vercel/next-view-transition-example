"use client";

import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Song } from "../types";

export default function useSpotify(song: Song, spotifyToken: string) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string>();
  const router = useRouter();

  const play = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }

    if (!player) {
      console.error("Spotify player not initialized");
      return;
    }

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
    } catch (error) {
      console.error("Error playing song:", error);
    }
  };

  const pause = async () => {
    if (!player) return;
    try {
      await player.pause();
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
        console.log("Ready with Device ID", device_id);
        setPlayer(player);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const login = () => router.push("/api/spotify/auth/login");

  const logout = () => {
    deleteCookie("spotify_token");
    setIsAuthenticated(false);
    if (player) {
      player.disconnect();
    }
  };

  useEffect(() => {
    if (spotifyToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return { play, pause, stop, isAuthenticated, login, logout, player };
}
