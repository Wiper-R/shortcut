"use client";

import { QrCode, ShortenLink } from "@prisma/client";
import { QRCodeCard } from "./qr-code-card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { DataProvider } from "@/contexts/data-provider";
import { Loader } from "@/components/Loader";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export type QRCodeWithShortenLink = QrCode & {
  ShortenLink: ShortenLink & { _count: { Engagement: number } };
};

type ShortenLinkApiData = {
  qrCodes: QRCodeWithShortenLink[];
};

export function QRCodeContainer() {
  const { data, element, isLoading } =
    useInfiniteScroll<ShortenLinkApiData>("/api/qr-codes");
  return (
    <div className="mt-4 flex flex-col space-y-4">
      {isLoading ? (
        <Loader className="my-10" />
      ) : data && data.pages[0].qrCodes.length ? (
        data.pages.map((page) =>
          page.qrCodes.map((data) => (
            <DataProvider data={data} key={data.id}>
              <QRCodeCard />
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
