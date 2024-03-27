import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/auth/context";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@/contexts/query-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shortcut",
  description: "A link shortener with rich features",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-hidden")}>
        <QueryClientProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
