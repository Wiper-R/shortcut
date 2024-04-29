"use client";

import { ShortenLink } from "@prisma/client";
import { LinkCard } from "./link-card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { DataProvider } from "@/contexts/data-provider";
import { Loader } from "@/components/Loader";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function LinkContainer() {
  const { data, element, isLoading } =
    useInfiniteScroll<ShortenLink>("/links");
  return (
    <div className="mt-4 flex flex-col space-y-4">
      {isLoading ? (
        <Loader className="my-10" />
      ) : data && data.pages[0].entries.length ? (
        data.pages.map((page) =>
          page.entries.map((data) => (
            <DataProvider data={data} key={data.id}>
              <LinkCard />
            </DataProvider>
          )),
        )
      ) : (
        <div className="text-center text-sm">
          You {"don't"} have any link{" "}
          <Link
            className={buttonVariants({ variant: "link", className: "py-0" })}
            href="create-new"
          >
            create one
          </Link>
        </div>
      )}
      <div ref={element} />
    </div>
  );
}
