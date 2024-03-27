"use client"

import { ShortenLink } from "@prisma/client"
import { useEffect, useRef, useState } from "react"
import { LinkCard } from "./link-card";
import { fetchApi } from "@/lib/api-helpers";
import { useInfiniteQuery } from "@tanstack/react-query";

type ShortenLinkGetResponse = {
    shortenLinks: ShortenLink[],
    nextPage: string | null;
}

export function LinkContainer() {
    const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery<ShortenLinkGetResponse>({
        queryKey: ["shorten-links"],
        queryFn: ({ pageParam }) => fetchLinks(pageParam as string),
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextPage
    })

    const observedElement = useRef<HTMLDivElement>(null);

    async function fetchLinks(cursor: string) {
        const res = await fetchApi<ShortenLinkGetResponse>(`/api/links?cursor=${cursor}`, {})
        if (res.code == "success") {
            return res.data;
        }

        throw new Error("Unable to fetch data. Cause: " + res.message)
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching && hasNextPage) {
                fetchNextPage();
            }
        });
        if (!observedElement.current) return;

        let element = observedElement.current;
        observer.observe(element);

        return () => observer.unobserve(element)
    }, [observedElement.current])

    return <div className="flex flex-col space-y-4 mt-4">
        {data?.pages.map(page => page.shortenLinks.map(shortenLink => <LinkCard shortenLink={shortenLink} key={shortenLink.id} />))}
        <div ref={observedElement} />
    </div>
}