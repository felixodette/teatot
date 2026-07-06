import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ponytail: Inter Display is not separately available in next/font/google.
// Using Inter with optical sizing enabled — visually equivalent for display use.
// Upgrade path: self-host Inter Display woff2 if pixel-diff testing reveals mismatch.
export const interDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-display",
  weight: ["400", "500", "600", "700"],
});
