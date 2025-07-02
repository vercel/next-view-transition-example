/// <reference types="youtube" />

// Add this declaration to fix the type error for window.onYouTubeIframeAPIReady
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

import { useEffect, useRef, useState } from "react";

export type YoutubePlayerState = "idle" | "playing" | "paused" | "stopped";

interface UseYoutubeReturn {
  play: () => void;
  player: YT.Player | null;
  stop: () => void;
  seek: (seconds: number) => void;
  mute: () => void;
  pauseToggle: () => void;
  muteToggle: () => void;
  playerState: YoutubePlayerState;
  iframeRef: React.RefObject<HTMLDivElement | null>;
  autoplayBlocked: boolean;
  setAutoplayBlocked: (value: boolean) => void;
  playerReady: boolean;
}

export default function useYoutube(videoId: string): UseYoutubeReturn {
  const playerRef = useRef<YT.Player | null>(null);
  const player = playerRef.current;
  const [playerState, setPlayerState] = useState<YoutubePlayerState>("idle");
  const [playerReady, setPlayerReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const iframeRef = useRef<HTMLDivElement | null>(null);

  // Cleanup previous player when videoId changes
  useEffect(() => {
    setPlayerReady(false); // Reset ready state immediately
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
        setPlayerReady(false);
        setPlayerState("idle");
        // Remove the old iframe from the container
        if (iframeRef.current) {
          iframeRef.current.innerHTML = "";
        }
      }
    };
  }, [videoId]);

  // Create player when API is ready
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      if (!iframeRef.current) {
        console.warn(
          "Youtube iframe not found. Please pass a ref to the iframe to use this hook",
        );
        return;
      }
      // Always clear the container before creating a new player
      iframeRef.current.innerHTML = "";
      const ytPlayer = new window.YT.Player(iframeRef.current, {
        height: "0",
        width: "0",
        videoId,
        playerVars: {
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            setPlayerState("idle");
            setPlayerReady(true);
          },
          onAutoplayBlocked: () => {
            setAutoplayBlocked(true);
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            switch (event.data) {
              case window.YT.PlayerState.PLAYING:
                setPlayerState("playing");
                break;
              case window.YT.PlayerState.PAUSED:
                setPlayerState("paused");
                break;
              case window.YT.PlayerState.ENDED:
                setPlayerState("stopped");
                break;
              default:
                setPlayerState("idle");
            }
          },
        },
      });
      playerRef.current = ytPlayer;
    };
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, [videoId]);

  const play = () => {
    if (!player || !playerReady || typeof player.playVideo !== "function")
      return;
    player.playVideo();
  };

  const pause = () => {
    if (!player || !playerReady || typeof player.pauseVideo !== "function")
      return;
    player.pauseVideo();
  };

  const stop = () => {
    if (!player || !playerReady || typeof player.stopVideo !== "function")
      return;
    player.stopVideo();
    setPlayerState("stopped");
  };

  const mute = () => {
    if (!player || !playerReady || typeof player.mute !== "function") return;
    player.mute();
  };

  const seek = (seconds: number) => {
    if (!player || !playerReady || typeof player.seekTo !== "function") return;
    player.seekTo(seconds, true);
  };

  const pauseToggle = () => {
    if (playerState === "playing") {
      pause();
    } else if (playerState === "paused") {
      play();
    }
  };

  const muteToggle = () => {
    if (!player || !playerReady || typeof player.isMuted !== "function") return;
    if (player.isMuted()) {
      if (typeof player.unMute === "function") player.unMute();
    } else {
      if (typeof player.mute === "function") player.mute();
    }
  };

  return {
    play,
    stop,
    seek,
    mute,
    pauseToggle,
    muteToggle,
    playerState,
    iframeRef,
    autoplayBlocked,
    setAutoplayBlocked,
    playerReady,
    player,
  };
}
