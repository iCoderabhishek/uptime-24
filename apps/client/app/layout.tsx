import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Appbar from "@/components/Appbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { dark } from "@clerk/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uptime24",
  description: "Your Distributed Uptime Network",
  openGraph: {
    title: "Uptime24",
    description: "Your Distributed Uptime Network",
    url: "https://uptime24.online",
    siteName: "Uptime24",
    images: [
      {
        url: "https://uptime24.online/preview.png",
        width: 1200,
        height: 630,
        alt: "Uptime24 Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptime24",
    description: "Make your site alive",
    images: ["https://uptime24.online/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <ThemeProvider defaultTheme="dark" storageKey="uptime24-theme"> */}
          <Appbar />
          {children}
          {/* </ThemeProvider> */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                border: "1px solid #374151",
                color: "#f9fafb",
              },
            }}
          />
        </body>
      </ClerkProvider>
    </html>
  );
}
