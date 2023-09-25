import Link from "next/link";
import { Metadata } from "next";
import { ActionButton, LinkEntries } from "./components";

export const metadata: Metadata = {
  title: "Links",
};

const LinkEntry = () => {
  const url = "localhost";
  return (
    <div className="bg-white py-3 px-5 rounded-lg shadow-sm flex justify-between gap-8">
      <div className="flex gap-2 justify-between flex-col">
        <div className="flex gap-2 items-center">
          <img
            src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`}
            alt=""
            className="w-12 rounded-full bg-white border self-start"
          />
          <h6 className="text-2xl font-semibold line-clamp-1 break-all hover:underline">
            <Link href="/links/view/custom-back-half">
              Lorem ipsum dolor sit amet.
            </Link>
          </h6>
        </div>
        <div className="text-lg font-semibold ml-14">
          <Link
            href="https://linkswift.com/l/your-link"
            className="text-primary line-clamp-1 break-all"
          >
            linkswift.com/l/your-link
          </Link>
          <Link
            href="https://your-original-link.com/very-long-url"
            className="line-clamp-1 break-all"
          >
            your-original-link.com/very-long-url/
          </Link>
        </div>
      </div>

      <div className="flex gap-3 self-start">
        <ActionButton icon="iconamoon:copy" text="Copy" />
        <ActionButton icon="fluent:edit-12-regular" text="Edit" />
      </div>
    </div>
  );
};

export default function ManageLinks() {
  return (
    <div className="mx-8 my-4 relative">
      <h4 className="text-2xl font-semibold text-gray-700">Links</h4>
      <hr />
      <LinkEntries/>
    </div>
  );
}
