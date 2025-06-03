import { createContext, useContext, useEffect, useState } from "react";

interface SpotifyContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  player: Spotify.Player | null;
}

const SpotifyContext = createContext<SpotifyContextType | null>(null);

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

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
          cb(localStorage.getItem("spotify_token") || "");
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

  const login = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    if (!clientId) {
      console.error("Spotify Client ID is not configured");
      return;
    }

    const redirectUri = window.location.origin + "/karaoke/callback";
    const scope = "streaming user-read-email user-read-private";

    // Generate a random state value for security
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem("spotify_auth_state", state);

    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${encodeURIComponent(scope)}&state=${state}&show_dialog=true`;

    window.location.href = url;
  };

  const logout = () => {
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("spotify_auth_state");
    setIsAuthenticated(false);
    if (player) {
      player.disconnect();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <SpotifyContext.Provider value={{ isAuthenticated, login, logout, player }}>
      {children}
    </SpotifyContext.Provider>
  );
}

export function useSpotifyContext() {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotifyContext must be used within a SpotifyProvider");
  }
  return context;
}
