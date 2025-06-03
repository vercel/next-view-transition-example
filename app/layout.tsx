import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life with Filip",
  description: "A little bit of everything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="frame-src 'self' https://sdk.scdn.co/embedded/index.html https://*.spotify.com;"
        />
        <meta
          httpEquiv="Feature-Policy"
          content="encrypted-media *; autoplay *;"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
