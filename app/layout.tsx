import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Figtree, Great_Vibes } from "next/font/google";
import { wedding } from "@/lib/wedding";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${wedding.names} — Wedding Invitation`,
  description: `${wedding.tagline}. ${wedding.dateLabel} at ${wedding.venue.name}.`,
  openGraph: {
    title: `You're invited to the wedding of ${wedding.names}`,
    description: `${wedding.dateLabel} · ${wedding.venue.name}, ${wedding.venue.city}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#efe6db] font-sans text-ink">
        <link rel="preload" href={wedding.music.src} as="audio" />
        {children}
      </body>
    </html>
  );
}
