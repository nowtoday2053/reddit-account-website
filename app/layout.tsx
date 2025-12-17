import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manifestoSerif = Playfair_Display({
  variable: "--font-karma-display",
  subsets: ["latin"],
  display: "swap",
});

const manifestoSans = Inter({
  variable: "--font-karma-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KarmaLab — Reddit Account Recovery & Compliance",
  description:
    "An edgy, compliance-first manifesto outlining KarmaLab’s approach to Reddit account recovery, risk mitigation, and reputation building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XHWKNTZZWG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XHWKNTZZWG');
          `}
        </Script>
      </head>
      <body
        className={`${manifestoSerif.variable} ${manifestoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
