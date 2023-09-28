import "./globals.css";
import type { Metadata } from "next";
import AppContainer from "@/components/AppContainer";

export const metadata: Metadata = {
  title: "Linkswift",
  description: "Success Begins with Simplified Sharing!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
