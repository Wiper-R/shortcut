"use client"
import { LoggedInGuard } from "@/components/LoggedInGuard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";


export default function LandingLayout({ children }: PropsWithChildren) {
    return <>
        <Navbar />
        <MaxWidthWrapper className="min-h-[calc(100svh-92px)] flex items-center justify-center">
            {children}
        </MaxWidthWrapper>
    </>
}