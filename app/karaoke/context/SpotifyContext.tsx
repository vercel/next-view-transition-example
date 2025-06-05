import { CookieValueTypes, deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
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
          const spotifyToken = getCookie("spotify_token") as CookieValueTypes;
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
    const token = getCookie("spotify_token");
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
