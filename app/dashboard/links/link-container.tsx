"use client";

import { ShortenLink } from "@prisma/client";
import { LinkCard } from "./link-card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { DataProvider } from "@/contexts/data-provider";

type ShortenLinkApiData = {
  shortenLinks: ShortenLink[];
};

export function LinkContainer() {
  const { data, element } = useInfiniteScroll<ShortenLinkApiData>("/api/links");
  return (
    <div className="mt-4 flex flex-col space-y-4">
      {data?.pages.map((page) =>
        page.shortenLinks.map((data) => (
          <DataProvider data={data} key={data.id}>
            <LinkCard/>
          </DataProvider>
        )),
      )}
      <div ref={element} />
    </div>
  );
}
