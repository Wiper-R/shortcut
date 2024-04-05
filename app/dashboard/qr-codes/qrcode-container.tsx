"use client";

import { QrCode, ShortenLink } from "@prisma/client";
import { QRCodeCard } from "./qr-code-card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { DataProvider } from "@/contexts/data-provider";
import { Loader } from "@/components/Loader";

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
      {data?.pages.map((page) =>
        page.qrCodes.map((data) => (
          <DataProvider data={data} key={data.id}>
            <QRCodeCard />
          </DataProvider>
        )),
      )}
      {isLoading && <Loader className="my-10" />}
      <div ref={element} />
    </div>
  );
}
