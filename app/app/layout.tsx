export const metadata = {
  title: "Ngurra Portal",
  description: "TLS Cultural & Business Standards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
