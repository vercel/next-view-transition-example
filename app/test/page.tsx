import { cookies as nextCookies } from "next/headers";
import Player from "../karaoke/hooks/Player";

export default async function Test() {
  const cookies = await nextCookies();
  const spotifyToken =
    "BQB__9RLg5jlv8ScZLFiw5ECCWxCn0fazw27C6W2d7KyYRjg63PvfeeuETjfQU_Vwd55OV7SBxysQSsHCTu4AbzPirX70_8ZPJZHJMShIDda0d37cBDQcwv-Xi63muBZIJ06kQZvVFUjq9E-zFFEK4E6HPhWAMeofsgER5R-1AZCumsn23HoD9URZF6oubpfdTehwT157-nw-4pG9xlsE4NRZ4RM2gf8UBq9xLSsU-vpIhwnQVg52_yAK3tjfO_KMw";
  return <Player token={spotifyToken} />;
}
