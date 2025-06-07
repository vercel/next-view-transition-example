"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTrack, loadSpotifyPlayer, play } from "./spotify";

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
];

export default function Player({ token }: { token?: string }) {
  const [isPlaying, setPlaying] = useState(false);
  const [track, setTrack] = useState<Spotify.Track>();
  const [deviceId, setDeviceId] = useState<string>("");
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isInitialized, setInitialized] = useState(false);
  const [isSDKLoaded, setSDKLoaded] = useState(false);

  const initPlayer = useCallback(async () => {
    console.log("initPlayer");

    const spotifyPlayer = new window.Spotify.Player({
      getOAuthToken: (callback: (input: string) => void) => {
        callback(token ?? "");
      },
      name: "Spotify Web Player",
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

    spotifyPlayer.addListener(
      "player_state_changed",
      (state: Spotify.PlaybackState) => {
        setPlaying(!state?.paused);
      },
    );

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
    console.log({ isSDKLoaded, token, isInitialized });
    if (isSDKLoaded && !!token && !isInitialized) {
      console.log("will init");
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
    if (isPlaying) {
      player?.pause();
    } else {
      await play(token ?? "", {
        deviceId,
        uris: ["spotify:track:7x76oRCpBsLnEOjMyZr0Gh"],
      });
    }
  };

  return (
    <div>
      <h1>Player</h1>
      <div>
        Get the{" "}
        <Link
          href={`https://accounts.spotify.com/en/authorize?response_type=token&client_id=2030beede5174f9f9b23ffc23ba0705c&redirect_uri=https:%2F%2Freact-spotify-web-playback.gilbarbara.dev%2Ftoken.html&scope=${scopes.join(
            "%20",
          )}&show_dialog=false`}
        >
          token
        </Link>
      </div>
      <div>{navigator.userAgent}</div>
      {/* <Spacer distribution="center" gap="xxs" mb="lg">
        <Input ref={inputRef} name="token" placeholder="Enter the token" />
        <Button onClick={handleClickSetToken}>Save</Button>
      </Spacer> */}
      {deviceId}
      {!!deviceId && !!player && (
        <>
          <div className="mb-xl">Device ID: {deviceId}</div>
          {track && (
            <div className="mb-xl">
              <img
                alt={track.name}
                src={track.album.images[0].url}
                width={128}
              />
              <div>{track.name}</div>
              <div>{track.artists[0].name}</div>
            </div>
          )}
          <button onClick={() => handleClickToggle()}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </>
      )}
    </div>
  );
}
