import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeInitScript } from "@/components/theme/theme-init-script";
import { VolcanoEruption } from "@/components/effects/volcano-eruption";
import { LiveClock } from "@/components/clock/live-clock";
import { WanderingEagle } from "@/components/effects/wandering-eagle";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "백유성의 오락실",
  description: "웹페이지 URL을 깨끗한 Markdown으로 변환해 LLM으로 바로 넘기는 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={cn(
        "h-full",
        "overflow-x-hidden",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <LiveClock />
        <VolcanoEruption />
        {children}
        <WanderingEagle />
      </body>
    </html>
  );
}
