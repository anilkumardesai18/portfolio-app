import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Anil Kumar Desai | AI & Mobile Developer Portfolio",
  description:
    "AI-Powered Full Stack & Android Developer, Gen AI & Prompt Engineer, IoT & Computer Vision enthusiast — building intelligent solutions with Kotlin, Next.js, and Google AI.",
  keywords: [
    "AI developer",
    "portfolio",
    "Gen AI",
    "prompt engineering",
    "Next.js",
    "OpenCV",
    "IoT",
    "Kotlin",
    "Android developer",
    "full stack developer",
    "Bengaluru",
    "mobile developer",
    "Firebase",
    "React Native",
  ],
  openGraph: {
    title: "Anil Kumar Desai | AI & Mobile Developer Portfolio",
    description:
      "AI-Powered Full Stack & Android Developer — building intelligent, scalable solutions with Kotlin, Next.js, Google AI API, and IoT.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anil Kumar Desai | AI & Mobile Developer",
    description:
      "Full Stack & Android Developer specializing in Gen AI, Prompt Engineering, Kotlin, and IoT solutions.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://anilkumardesai.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Anil Kumar Desai",
              jobTitle: "AI & Mobile Developer",
              email: "anilkumardesai18@gmail.com",
              telephone: "+91-9108124418",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560056",
                addressCountry: "IN",
              },
              url: "https://anilkumardesai.dev",
              sameAs: [
                "https://github.com/anilkumardesai18",
                "https://www.linkedin.com/in/anil-kumar-desai-b3818b32b",
              ],
              knowsAbout: [
                "AI Development",
                "Android Development",
                "Kotlin",
                "Full Stack Development",
                "Gen AI",
                "Prompt Engineering",
                "IoT",
                "Computer Vision",
              ],
            }),
          }}
        />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
