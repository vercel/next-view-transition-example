"use client";

import { Song } from "@/app/types";
import { deleteCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

type PlayerState = "idle" | "playing" | "paused" | "stopped";

export default function useSpotify(
  song: Song,
  spotifyToken: string | undefined,
  onSongEnd?: () => void,
) {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState();
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [token, setToken] = useState(spotifyToken);

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/spotify/auth/refresh", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        setToken(data.access_token);
        return data.access_token;
      }
      throw new Error("Failed to refresh token");
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  };

  const play = async () => {
    if (!token) {
      console.warn("User not logged in. Will not play spotify track");
      return;
    }

    if (!player) {
      console.error("Spotify player not initialized");
      return;
    }

    if (playerState === "playing") return;

    try {
      // Start playback
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: [song.spotifyUri],
          }),
        },
      );

      if (response.status === 401) {
        // Token expired, try to refresh
        const newToken = await refreshToken();
        if (newToken) {
          // Retry with new token
          await fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${newToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uris: [song.spotifyUri],
              }),
            },
          );
        }
      }
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
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Karaoke Player",
        getOAuthToken: async (cb) => {
          try {
            const response = await fetch("https://api.spotify.com/v1/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 401) {
              const newToken = await refreshToken();
              if (newToken) {
                setToken(newToken);
                cb(newToken);
                return;
              }
            }
            cb(token ?? "");
          } catch (error) {
            console.error("Error checking token:", error);
            cb(token ?? "");
          }
        },
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

      player.addListener("player_state_changed", async (state) => {
        if (state.paused && state.position === 0) {
          onSongEnd?.();
          setPlayerState("stopped");
          return;
        }
      });

      player.connect();
    };
  }, [token, onSongEnd]);

  const seek = async (seconds: number) => {
    if (!player) {
      console.error("Spotify player not initialized");
      return;
    }

    try {
      await player.seek(seconds * 1000);
      console.log(`Seeked to ${seconds} seconds`);
    } catch (error) {
      console.error("Error seeking:", error);
    }
  };

  const logout = () => {
    deleteCookie("spotify_token");
    deleteCookie("spotify_refresh_token");
    if (player) {
      player.disconnect();
    }
    setPlayerState("idle");
    setToken(undefined);
  };

  return { play, pauseToggle, stop, logout, seek, player, playerState };
}
