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
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [playerState, setPlayerState] = useState<YoutubePlayerState>("idle");
  const [playerReady, setPlayerReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const iframeRef = useRef<HTMLDivElement | null>(null);

  // Create player when API is ready
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      if (!iframeRef.current) {
        console.warn(
          "Youtube iframe not found. Please pass a ref to the iframe to use this hook",
        );
        return;
      }
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
            console.log("onAutoplayBlocked");
            setAutoplayBlocked(true);
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            console.log("onStateChange", event.data);
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
      setPlayer(ytPlayer);
    };
    // If API is already loaded
    if (window.YT && window.YT.Player && !player) {
      window.onYouTubeIframeAPIReady();
    }
  }, [videoId]);

  const play = () => {
    if (player && playerReady) player.playVideo();
  };

  const pause = () => {
    if (player && playerReady) player.pauseVideo();
  };

  const stop = () => {
    if (player && playerReady) player.stopVideo();
    setPlayerState("stopped");
  };

  const mute = () => {
    if (player && playerReady) player.mute();
  };

  const seek = (seconds: number) => {
    if (player && playerReady) player.seekTo(seconds, true);
  };

  const pauseToggle = () => {
    if (playerState === "playing") {
      pause();
    } else if (playerState === "paused") {
      play();
    }
  };

  const muteToggle = () => {
    if (!playerReady || !player) return;
    if (player.isMuted()) {
      player.unMute();
    } else {
      player.mute();
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
