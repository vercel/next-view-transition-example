import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Song } from "../types";

export default function useSpotify(song: Song, spotifyToken?: string) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load Spotify Web Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Karaoke Player",
        getOAuthToken: (cb) => {
          cb(spotifyToken ?? "");
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setPlayer(player);
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
      // Search for the song
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          `${song.name} ${song.artist}`,
        )}&type=track&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        },
      );

      const data = await response.json();
      const trackUri = data.tracks?.items[0]?.uri;

      if (!trackUri) {
        console.error("Song not found on Spotify");
        return;
      }

      // Start playback
      await fetch("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      });
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

  return { play, pause, stop, isAuthenticated, login, logout, player };
}
