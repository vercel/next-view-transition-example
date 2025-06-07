"use client";

import { Song } from "@/app/types";
import { deleteCookie } from "cookies-next/client";
import { useCallback, useEffect, useState } from "react";
import { getTrack, loadSpotifyPlayer, play as playSpotify } from "./spotify";

type PlayerState = "idle" | "playing" | "paused" | "stopped";

export default function useSpotify(
  song: Song,
  spotifyToken: string | undefined,
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

  const [isInitialized, setInitialized] = useState(false);
  const [isSDKLoaded, setSDKLoaded] = useState(false);
  const [track, setTrack] = useState<Spotify.Track>();

  const initPlayer = useCallback(async () => {
    console.log("initPlayer");

    const spotifyPlayer = new window.Spotify.Player({
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

    // Ready
    spotifyPlayer.addListener("ready", async ({ device_id }: any) => {
      console.log(`Ready with Device ID: ${device_id}`);
      setDeviceId(device_id);
    });

    // Not Ready
    spotifyPlayer.addListener("not_ready", ({ device_id }: any) => {
      console.log("Device ID has gone offline", device_id);
    });

    spotifyPlayer.addListener("initialization_error", ({ message }: any) => {
      console.error(message);
    });

    spotifyPlayer.addListener("authentication_error", ({ message }: any) => {
      console.error(message);
    });

    spotifyPlayer.addListener("account_error", ({ message }: any) => {
      console.error(message);
    });

    spotifyPlayer.addListener("autoplay_failed", async () => {
      // eslint-disable-next-line no-console
      console.log("Autoplay is not allowed by the browser autoplay rules");
    });

    setPlayer(spotifyPlayer);

    await spotifyPlayer.connect();
    setInitialized(true);
  }, [setDeviceId, setPlayer, token]);

  useEffect(() => {
    if (!isSDKLoaded) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("onSpotifyWebPlaybackSDKReady");
        setSDKLoaded(true);
      };

      loadSpotifyPlayer();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    if (isSDKLoaded && !!token && !isInitialized) {
      initPlayer();
    }
  }, [initPlayer, isInitialized, isSDKLoaded, token]);

  useEffect(() => {
    if (token) {
      getTrack(token, "7x76oRCpBsLnEOjMyZr0Gh").then((response) => {
        setTrack(response);
      });
    }
  }, [token]);

  const handleClickToggle = async () => {
    console.log("BOOOOO");
    if (playerState === "playing") {
      player?.pause();
    } else {
      await playSpotify(token ?? "", {
        deviceId: deviceId ?? "",
        uris: ["spotify:track:7x76oRCpBsLnEOjMyZr0Gh"],
      });
    }
  };

  return {
    play,
    pauseToggle,
    stop,
    logout,
    seek,
    player,
    track,
    playerState,
    deviceId,
    handleClickToggle,
  };
}
