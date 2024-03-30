"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
export function useLiveSearch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    function onSearch(search: string) {
        const params = new URLSearchParams(searchParams);
        if (search)
            params.set("search", search)
        else params.delete("search")
        router.replace(`${pathname}?${params.toString()}`)
    }

    return { onSearch };
}