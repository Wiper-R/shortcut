import Link from "next/link";
import { ActionButton } from "./components";
import { Link as PrismaLink } from "@prisma/client";
import { formatDateTimeToUTC, trimProtocols } from "@/utils";

export default function LinkEntry({ id, url, title, createdAt }: PrismaLink) {
  const urlObj = new URL(url);
  createdAt = new Date(createdAt);
  title = title || "Untitled " + formatDateTimeToUTC(createdAt);
  return (
    <div className="bg-white py-3 px-5 rounded-lg shadow-sm flex justify-between gap-8">
      <div className="flex gap-6 justify-between">
        <img
          src={`https://www.google.com/s2/favicons?domain=http://${
            urlObj.hostname || "localhost"
          }&sz=32`}
          alt=""
          className="w-10 rounded-full bg-white border self-start"
        />
        <div className="flex flex-col gap-2">
          <h6 className="text-2xl font-semibold line-clamp-1 break-all hover:underline">
            <Link href={`/links/view/${id}`}>{title}</Link>
          </h6>

          <div className="flex flex-col leading-6 text-lg font-medium">
            <Link
              href={`https://linkswift.com/l/${id}`}
              className="text-primary line-clamp-1 break-all"
            >
              {`linkswift.com/l/${id}`}
            </Link>
            <Link href={url} className="line-clamp-1 break-all">
              {trimProtocols(url)}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-3 self-start">
        <ActionButton icon="iconamoon:copy" text="Copy" />
        <ActionButton icon="fluent:edit-12-regular" text="Edit" />
      </div>
    </div>
  );
}
