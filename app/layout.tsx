import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { BRAND_DISPLAY } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "Post the car you want and receive competitive quotes from verified Japanese exporters and dealers. Transparent, secure, UK-focused.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  applicationName: BRAND_DISPLAY,
  title: {
    default: `${BRAND_DISPLAY} — Trusted Japanese vehicle import marketplace`,
    template: `%s — ${BRAND_DISPLAY}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: BRAND_DISPLAY,
    title: BRAND_DISPLAY,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_DISPLAY,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          {children}
          <Toaster richColors closeButton position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
