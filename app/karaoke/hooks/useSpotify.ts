import { useSpotifyContext } from "../context/SpotifyContext";
import { Song } from "../types";

export default function useSpotify(song: Song) {
  const { player, isAuthenticated, login } = useSpotifyContext();

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
            Authorization: `Bearer ${localStorage.getItem("spotify_token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("spotify_token")}`,
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

  return { play, pause, stop };
}
