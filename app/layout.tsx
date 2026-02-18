import type { Metadata } from "next";
import "./globals.css";
import { sans_serif } from "./fonts";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/landing-page/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saanjh Matrimonial Services",
    template: "%s | Saanjh Matrimonial Services",
  },
  description:
    "Celebrate love the Indian way, where tradition meets destiny. Discover your life partner with our trusted matrimonial platform.",
  applicationName: "Saanjh Matrimonial Services",
  keywords: [
    "matrimony",
    "matrimonial",
    "matchmaking",
    "wedding",
    "Indian matrimony",
    "Punjabi matrimony",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Saanjh Matrimonial Services",
    title: "Saanjh Matrimonial Services",
    description:
      "Celebrate love the Indian way, where tradition meets destiny. Discover your life partner with our trusted matrimonial platform.",
    images: [
      {
        url: "/Background_Saanjh_Compressed.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saanjh Matrimonial Services",
    description:
      "Celebrate love the Indian way, where tradition meets destiny. Discover your life partner with our trusted matrimonial platform.",
    images: ["/Background_Saanjh_Compressed.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans_serif.className}  antialiased`}>
        {modal}
        <Toaster />
        <nav>
          <Navbar />
        </nav>{" "}
        {children}
        <Footer />
      </body>
    </html>
  );
}
