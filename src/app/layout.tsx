import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BoringFin — Personal Finance Assistant",
  description:
    "BoringFin is your AI-powered personal finance butler — helping you manage debt, taxes, goals, investments, and more.",
  keywords: [
    "personal finance",
    "AI finance assistant",
    "budget planner",
    "debt management",
    "investment tracking",
    "goal planning",
    "tax optimization",
  ],
  authors: [{ name: "Chandrathej Kammati" }],
  creator: "Chandrathej Kammati",
  publisher: "Chandrathej Kammati",
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  openGraph: {
    title: "BoringFin — Personal Finance Assistant",
    description:
      "Your AI-powered finance butler for debt, investment, tax, and goal management.",
    url: "https://www.boringfin.com",
    siteName: "BoringFin",
    images: [
      {
        url: "/og-image.png", // place your OG image under /public
        width: 1200,
        height: 630,
        alt: "BoringFin App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BoringFin — Personal Finance Assistant",
    description:
      "Your AI-powered finance butler for debt, investment, tax, and goal management.",
    images: ["/og-image.png"],
    creator: "@boringfin",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-neutral-950 text-gray-100">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
