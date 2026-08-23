import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edurefertech.com"),

  category: "Education",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  title: {
    default: "Edurefer | Learn. Build. Get Certified. Get Hired.",
    template: "%s | Edurefer",
  },

  description:
    "Edurefer is a modern learning platform offering industry-focused courses, certifications, learning kits, AI-powered learning and Placement Assistance.",

  keywords: [
    "Edurefer",
    "Online Learning",
    "ITE Tech Solutions",
    "Programming",
    "Full Stack",
    "Python",
    "Java",
    "AI",
    "Machine Learning",
    "Data Science",
    "Placement",
    "Courses",
    "Internship",
  ],

  authors: [
    {
      name: "Edurefer",
    },
  ],

  creator: "Edurefer",

  publisher: "ITE Tech Solutions",

  applicationName: "Edurefer",

  openGraph: {
    title: "Edurefer",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Edurefer",
      },
    ],
    description:
      "Learn. Build. Get Certified. Get Hired.",
    url: "https://edurefertech.com",
    siteName: "Edurefer",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
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
      suppressHydrationWarning className={cn("font-sans", geist.variable)}
    >
      <body
        className={`${geist.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <TooltipProvider>
              {children}
              <Toaster richColors position="top-right" />
            </TooltipProvider>
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}