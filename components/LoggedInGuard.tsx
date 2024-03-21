"use client"


import useSession from "@/auth/useSession";
import { useRouter } from "next/navigation";
import { PropsWithChildren, Suspense } from "react";

export function LoggedInGuard({ children }: PropsWithChildren) {
    const session = useSession();
    const router = useRouter();
    if (session.session.data?.user) {
        router.push("/dashboard")
    }

    return children;
}