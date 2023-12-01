"use client";

import { trpc } from "@/app/_trpc/client";
import DashboardPage from "@/components/layouts/DashboardPage";
import LinkCard from "@/components/LinkCard";
import LinkToolbar from "@/components/LinkToolbar";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LinksContainer = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string | null>(
    searchParams.get("search"),
  );

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearch(searchParams.get("search"));
    }, 500);
  }, [searchParams.get("search")]);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    trpc.links.getAll.useInfiniteQuery(
      { limit: 8, search },
      { getNextPageParam: (lastPage, pages) => lastPage.nextPage },
    );

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching && hasNextPage) {
        fetchNextPage();
      }
    });

    if (divRef.current) observer.observe(divRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetching, divRef.current]);

  return (
    <div className="flex flex-grow flex-col gap-2">
      {isLoading ? (
        <Loader2 className="h-10 w-10 animate-spin self-center" />
      ) : data?.pages[0].data.length ? (
        <>
          {data.pages.map((page) =>
            page.data.map((link) => <LinkCard link={link} key={link.id} />),
          )}
          <div className="w-full flex-grow py-4 text-center">
            {isFetching ? (
              <Loader2 className="mx-auto h-10 w-10 animate-spin " />
            ) : !hasNextPage ? (
              <div className="flex items-center">
                <span className="h-px flex-grow border-b" />
                <span className="px-4 text-secondary">
                  You have reached the end of links
                </span>
                <span className="h-px flex-grow border-b" />
              </div>
            ) : null}
          </div>
          <div ref={divRef} />
        </>
      ) : (
        <span className="mx-auto mt-10">
          No links to display{" "}
          <Link href="/dashboard/create-new" className="text-ascent">
            create a new link{" "}
          </Link>{" "}
          to view and manage links
        </span>
      )}
    </div>
  );
};

const LinksPage = () => {
  return (
    <DashboardPage heading="Links">
      <LinkToolbar />
      <LinksContainer />
    </DashboardPage>
  );
};

export default LinksPage;
