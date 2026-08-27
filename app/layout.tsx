import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Power Master Chile | Servicio Técnico Automotriz en Temuco",
  description: "Diagnóstico, mecánica general, frenos, mantenciones, revisión precompra y grúa en Temuco.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/dvvuwigmy/video/upload/f_mp4,q_auto:good,vc_h264/v1787811302/InDown_uqk6ex.mp4"
          type="video/mp4"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
