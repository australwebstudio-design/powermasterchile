import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Power Master Chile | Servicio Técnico Automotriz en Temuco",
  description: "Diagnóstico, mecánica general, frenos, mantenciones, revisión precompra y grúa en Temuco.",
  other: {
    "codex-preview": "development",
  },
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
