import "./globals.css";
import type { Metadata } from "next";
import AppContainer from "@/components/AppContainer";
import AuthContextProvider, { AuthContext } from "@/contexts/auth-context";

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
      <body className="max-w-screen-2xl mx-auto min-h-screen">
        <AuthContextProvider>
          <AppContainer>{children}</AppContainer>
        </AuthContextProvider>
      </body>
    </html>
  );
}
