import { cookies } from "next/headers";
import KaraokeContent from "./KaraokeContent";

export default async function KaraokePage() {
  const spotifyToken = (await cookies()).get("spotify_token")?.value;
  return <KaraokeContent spotifyToken={spotifyToken} />;
}
