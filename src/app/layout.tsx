import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights} from "@vercel/speed-insights/next";
import Script from 'next/script';
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import FloatingPhoneIcon from "@/components/FloatingPhoneIcon";
import LazyChatbotWidget from "@/components/LazyChatbotWidget";
import { OrganizationJsonLd } from "@/components/JsonLd";

// Heading font: AllRoundGothic — Medium (500) and Demi (700).
// font-bold (700) and font-black (900) both resolve to Demi via nearest-weight matching.
const allRoundGothic = localFont({
  src: [
    {
      path: '../fonts/AllRoundGothic-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/AllRoundGothic-Demi.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-all-round-gothic',
  display: 'swap',
});

// Body font: Montserrat
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});



export const metadata: Metadata = {
  title: "Sell My Car Online in Sydney | Fast Cash | Auto-Sell.ai",
  description: "Looking to sell my car online? We make it easy to sell your car in Sydney. Get a free 30-minute quote, same-day OSKO payment, and we come to you!",
  keywords: "sell my car, sell my car online, cash for cars Sydney, sell car fast, instant car quote, same day payment, sell car online, we buy cars",
  authors: [{ name: "Auto-Sell.ai" }],
  openGraph: {
    title: "Sell My Car Online in Sydney | Fast Cash | Auto-Sell.ai",
    description: "Looking to sell my car online? We make it easy to sell your car in Sydney. Get a free 30-minute quote, same-day OSKO payment, and we come to you!",
    type: "website",
    locale: "en_AU",
    url: "https://auto-sell.ai",
    siteName: "Auto-Sell.ai",
    images: [
      {
        url: "https://auto-sell.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Auto-Sell.ai - Sell Your Car Fast for Cash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell My Car Online in Sydney | Fast Cash | Auto-Sell.ai",
    description: "Looking to sell my car online? We make it easy to sell your car in Sydney. Get a free 30-minute quote, same-day OSKO payment, and we come to you!",
    images: ["https://auto-sell.ai/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://auto-sell.ai',
  },
  verification: {
    google: 'uesYUYENnimZ0evqhEg6cDi3L4pH9it5-cqJXmo9RQM',
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
// floating phone icon on entire website. Create component for this and insert in this file.
// Stands parallel to the chat icon,
// Remove description, add images for each model. max width of 150px. 3 car models at a time, rotating.
// {/* Value my car now button to auto-scroll to the top  */} home page
// incorporate links in the mapping process for home page for brands and types
// Hero banner for individual car brands to have home page form
// Styling of home page as trial
// reviews integration
// include navigtation link for Contact
// Maps API integration
// Footer to include the querystring for brands and types
// Under the Why choose Auto sell AI - each of the value proposition icons need to be clickable to a page explaining the value proposition statement
// blog page integration & supabase authentication
// regional areas integration pending confirmatio of viability
// remove damaged cars from navigation, add brands & types to navigation with dropdown for each
// Contact dropdown to include blog, reviews, FAQ
// fix padding in contact us page.
// 15th of September Soft launch. Fully functional
// remove emojis & add background images for vehicle types . Logo's for model brands


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
    <head>
      {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
      )}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" href="/favicon.ico" sizes="48x48 32x32 16x16" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FFC325" />
    </head>
      <body
        className={`${allRoundGothic.variable} ${montserrat.variable} md:mx-auto antialiased min-h-screen bg-white`}
      >
      {GTM_ID && (
        <noscript>
          <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}
        <OrganizationJsonLd />
        {children}

        <LazyChatbotWidget />
        <Footer />
        <FloatingPhoneIcon />
      <Analytics />
      <SpeedInsights />
      </body>
    </html>
  );
}
