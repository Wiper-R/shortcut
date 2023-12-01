"use client";

import Providers from "@/components/Providers";
import { cs } from "@/lib";
import { Inter } from "next/font/google";
import React, { PropsWithChildren, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "@/auth/context";
const inter = Inter({ subsets: ["latin"] });
import ReactModal from "react-modal";

export default function RootLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    ReactModal.setAppElement("#main");
  }, []);
  return (
    <html lang="en">
      <Providers>
        <body className={cs(inter.className, "bg-[#FAFAF9]")}>
          <SessionProvider>
            <div id="main">{children}</div>
            <ToastContainer />
          </SessionProvider>
          <div id="modals" className="isolate z-50" />
        </body>
      </Providers>
    </html>
  );
}
