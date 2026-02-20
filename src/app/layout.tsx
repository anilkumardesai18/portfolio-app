import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Anil Kumar Desai | AI Developer Portfolio",
  description: "AI-Powered Web Developer, Gen AI & Prompt Engineer, IoT & Computer Vision — Building intelligent solutions.",
  keywords: ["AI developer", "portfolio", "Gen AI", "prompt engineering", "Next.js", "OpenCV", "IoT", "Bengaluru"],
  openGraph: {
    title: "Anil Kumar Desai | AI Developer Portfolio",
    description: "AI-Powered Web Developer, Gen AI & Prompt Engineer, IoT & Computer Vision — Building intelligent solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
