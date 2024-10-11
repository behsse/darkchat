import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { SessionWrapper } from "@/lib/SessionWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { PostProvider } from "@/lib/PostContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Darkchat",
  description: "Social media example with Next.js, Shadcn/ui, Tailwind CSS, and Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex w-full justify-center max-md:px-2">
      <SessionWrapper>
        <PostProvider>
          <body className={cn("w-[600px] h-full", inter.className)}>
            <ThemeProvider attribute="class" defaultTheme="system">
              <Navbar/>
              {children}
            </ThemeProvider>
          </body>
        </PostProvider>
      </SessionWrapper>
    </html>
  );
}
