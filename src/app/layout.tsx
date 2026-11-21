import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/Navbar";

export const metadata: Metadata = {
  title: "Doomsday Ready — Ultimate MCU Rewatch & Booking Hub",
  description:
    "Prepare for Avengers: Doomsday (2026). Custom MCU chronological rewatch planning and cinema ticket bundle optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-marvel-600 selection:text-white flex flex-col justify-between">
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="w-full border-t border-surface-border bg-surface/50 py-6 text-center text-xs text-gray-400">
            <p>
              DOOMSDAY READY © 2026 • Designed for Marvel Cinematic Universe fans preparing for Avengers: Doomsday.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
