import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { meta } from "@/content/copy";
import { PAGE_SLUG, SITE_URL } from "@/config/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.title,
  description: meta.description,
  keywords: [...meta.keywords],
  alternates: { canonical: PAGE_SLUG },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: PAGE_SLUG,
    siteName: "Leonor's Sweet Creations",
    title: meta.ogTitle,
    description: meta.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4ede4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      // The inline script below adds the "js" class before hydration; this stops React warning about it.
      suppressHydrationWarning
    >
      <head>
        {/* Marks that JavaScript runs, so scroll-reveal styles only apply when the observer can undo them. Constant string, no user data. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
