export interface SpotifyPlayOptions {
  context_uri?: string;
  deviceId: string;
  offset?: number;
  uris?: string[];
}

export function loadSpotifyPlayer(): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    const scriptTag = document.getElementById("spotify-player");

    if (!scriptTag) {
      const script = document.createElement("script");

      script.id = "spotify-player";
      script.type = "text/javascript";
      script.async = false;
      script.defer = true;
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.onload = () => resolve();
      script.onerror = (error: any) =>
        reject(new Error(`loadScript: ${error.message}`));

      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
}

export async function getTrack(token: string, trackId: string) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data as Spotify.Track;
}

export async function pause(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/pause`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
}

export async function play(
  token: string,
  { deviceId, uris }: SpotifyPlayOptions,
) {
  console.log(JSON.stringify({ uris }));

  return fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      body: JSON.stringify({ uris }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
    },
  );
}

export async function transferPlayback(
  token: string,
  deviceId: string,
  play = false,
) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    body: JSON.stringify({ device_ids: [deviceId], play }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
}
