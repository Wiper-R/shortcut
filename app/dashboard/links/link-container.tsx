"use client"

import { ShortenLink } from "@prisma/client";
import { LinkCard } from "./link-card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type ShortenLinkApiData = {
    shortenLinks: ShortenLink[]
}

export function LinkContainer() {
    const { data, element } = useInfiniteScroll<ShortenLinkApiData>("/api/links")
    return <div className="flex flex-col space-y-4 mt-4">
        {data?.pages.map(page => page.shortenLinks.map(data => <LinkCard shortenLink={data} key={data.id} />))}
        <div ref={element} />
    </div>
}