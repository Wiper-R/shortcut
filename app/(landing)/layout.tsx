"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";;
import { PropsWithChildren } from "react";

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen overflow-auto">
      <Navbar />
      <MaxWidthWrapper className="flex min-h-[calc(100svh-92px)] items-center justify-center">
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
