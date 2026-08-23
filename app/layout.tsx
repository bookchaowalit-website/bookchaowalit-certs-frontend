import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const passportDisplay = Cormorant_Garamond({ variable: "--font-passport-display", subsets: ["latin"] });
const passportMono = IBM_Plex_Mono({ variable: "--font-passport-mono", subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = { title: "Passport — Credential ledger", description: "Keep a personal record of certifications and credentials.", metadataBase: new URL("https://certs.bookchaowalit.com"), alternates: { canonical: "https://certs.bookchaowalit.com" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${passportDisplay.variable} ${passportMono.variable}`}><body><Analytics /><SpeedInsights />{children}</body></html>;
}
