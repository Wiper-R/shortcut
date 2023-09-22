"use client";

import Link from "next/link";
import TestImage from "../../assets/youtube.png";
import { Icon } from "@iconify/react";

const LinkEntry = () => {
  return (
    <div className="bg-white py-3 px-5 rounded-lg shadow-sm flex flex-col justify-between gap-8">
      <div className="flex gap-2 justify-between flex-col">
        <div className="flex gap-2 flex-col">
          <img
            src={TestImage.src}
            alt=""
            className="w-12 rounded-full bg-white border self-start"
          />
          <h6 className="text-2xl font-semibold line-clamp-1 break-all hover:underline">
            <Link href="links/view/custom-back-half">
              Lorem ipsum dolor sit amet.
            </Link>
          </h6>
        </div>
        <div className="text-lg font-semibold"> {/** ml-14 */}
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
        <button className="flex gap-1 items-center py-1 px-2 bg-gray-200 rounded-md  hover:bg-sky-200">
          <Icon icon="iconamoon:copy" />
          <span>Copy</span>
        </button>
        <button className="flex gap-1 items-center py-1 px-2 bg-gray-200 rounded-md hover:bg-sky-200">
          <Icon icon="fluent:edit-12-regular" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default function ManageLinks() {
  return (
    <div className="mx-8 my-4">
      <h4 className="text-2xl font-semibold text-gray-700">Links</h4>
      <hr />
      <section className="flex flex-col gap-5 mt-5">
        <LinkEntry />
        <LinkEntry />
        <LinkEntry />
        <LinkEntry />
      </section>
    </div>
  );
}
