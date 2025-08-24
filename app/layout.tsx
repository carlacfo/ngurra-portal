import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ngurra Portal",
  description: "TLS Cultural & Business Standards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add extra meta tags here later (favicon, og:image, etc.) */}
      </head>
      <body>{children}</body>
    </html>
  );
}
Update layout.tsx with root layout and metadata
