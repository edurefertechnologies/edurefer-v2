import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edurefertech.com"),

  title: {
    default: "Edurefer | Learn. Build. Get Certified. Get Hired.",
    template: "%s | Edurefer",
  },

  description:
    "Edurefer is a modern learning platform offering industry-focused courses, certifications, learning kits, AI-powered learning and 100% Placement Assistance.",

  keywords: [
    "Edurefer",
    "ITE Computer Institute",
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

  publisher: "Edurefer",

  applicationName: "Edurefer",

  openGraph: {
    title: "Edurefer",
    description:
      "Learn. Build. Get Certified. Get Hired.",
    url: "https://edurefertech.com",
    siteName: "Edurefer",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Edurefer",
    description:
      "Learn. Build. Get Certified. Get Hired.",
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
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}