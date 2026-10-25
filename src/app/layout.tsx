import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Bebas_Neue,
  DM_Sans,
  Inter_Tight,
  Italiana,
  Hind_Siliguri,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import GoogleTagManager from "@/components/layouts/shared/analytics/GoogleTagManager";

/* ---------------- FONTS---------------- */

// Signature / special text
const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

// Logo
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

// Headings (condensed, bold look)
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Prices
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-price",
  display: "swap",
});

//for bangla font
const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amina Sports | Shoes & Sportswear",
  description:
    "Shop quality shoes and sportswear at Amina Sports. Great prices and Cash on Delivery all over Bangladesh.",
  keywords: [
    "Amina Sports",
    "shoes",
    "sneakers",
    "sportswear",
    "footwear",
    "Bangladesh",
  ],
  authors: [{ name: "Amina Sports" }],
  creator: "Amina Sports",
  openGraph: {
    title: "Amina Sports | Shoes & Sportswear",
    description:
      "Shop quality shoes and sportswear at Amina Sports. Cash on Delivery all over Bangladesh.",
    siteName: "Amina Sports",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        cormorant.variable,
        bebas.variable,
        dmSans.variable,
        interTight.variable,
        italiana.variable,
        hindSiliguri.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <GoogleTagManager />
        {children}
        {/* Toast Provider */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
