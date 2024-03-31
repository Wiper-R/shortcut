import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/prisma";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import React from "react";

type PageProps = {
  slug: string;
};

const Message = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="mx-auto flex flex-col gap-2 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p>{description}</p>
      <p>
        Return to{" "}
        <Link
          href={"/"}
          className={buttonVariants({ variant: "link", className: "px-0.5" })}
        >
          Home
        </Link>
      </p>
    </div>
  );
};

async function ShortenLinkPage({
  params: { slug },
  searchParams,
}: {
  params: PageProps;
  searchParams: {
    [key: string]: string;
  };
}) {
  const link = await prisma.shortenLink.findFirst({ where: { slug } });
  const isQR = typeof searchParams.qr !== "undefined";
  const handleRedirect = async () => {
    if (!link)
      throw new Error(
        "handleRedirect should only be called when link is not null and not expired.",
      );
    await prisma.engagement.create({
      data: { type: isQR ? "qr" : "link", shortenLinkId: link.id },
    });
    redirect(link.destination, RedirectType.replace);
  };

  if (link) return handleRedirect();
  return (
    <MaxWidthWrapper className="flex min-h-screen items-center overflow-auto py-4">
      <Message
        title="Link not found"
        description="The link doesn't seem to exists, maybe you made a typo?"
      />
    </MaxWidthWrapper>
  );
}

export default ShortenLinkPage;
