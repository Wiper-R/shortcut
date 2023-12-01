import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen-svh">
      <Navbar />
      <div className="flex h-full flex-grow flex-col py-16">{children}</div>
      <Footer />
    </div>
  );
}
