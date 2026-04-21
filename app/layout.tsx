export const metadata = {
  title: "Embr × Next.js App Router",
  description: "SSR + RSC + ISR + streaming on Embr microVMs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          margin: 0,
          padding: "2rem",
          background: "#0b0d12",
          color: "#e7ecf3",
        }}
      >
        <main style={{ maxWidth: 820, margin: "0 auto" }}>{children}</main>
      </body>
    </html>
  );
}
