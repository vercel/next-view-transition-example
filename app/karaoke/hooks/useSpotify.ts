import { Song } from "../types";

export default function useSpotify(song: Song) {
  const play = () => {
    console.log("play", song);
  };

  const pause = () => {
    console.log("pause", song);
  };

  const stop = () => {
    console.log("stop", song);
  };

  return { play, pause, stop };
}
