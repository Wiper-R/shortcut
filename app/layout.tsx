import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/auth/client";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@/contexts/query-client-provider";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "overflow-hidden")}>
        <QueryClientProvider>
          <SessionProvider>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </SessionProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
