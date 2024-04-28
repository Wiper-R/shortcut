"use client";
import useSession from "@/auth/useSession";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function LandingLayout({ children }: PropsWithChildren) {
  const { session } = useSession();
  const router = useRouter();

  return (
    <div className="h-screen overflow-auto">
      <Navbar />
      <MaxWidthWrapper className="flex min-h-[calc(100svh-92px)] items-center justify-center">
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
