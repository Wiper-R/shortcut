import LinkWithPassword from "@/components/LinkWithPassword";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import prisma from "@/prisma";
import { appRouter } from "@/trpc";
import moment from "moment";
import { headers } from "next/headers";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";
import React from "react";

type PageProps = {
  backHalf: string;
};

const Message = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="mx-auto flex flex-col gap-5 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p>{description}</p>
      <p className="font-medium">
        Return to{" "}
        <Link href={"/"} className="text-ascent underline underline-offset-2">
          home
        </Link>
      </p>
    </div>
  );
};

async function ShortenLinkPage({
  params: { backHalf },
  searchParams,
}: {
  params: PageProps;
  searchParams: {
    [key: string]: string;
  };
}) {
  const link = await prisma.link.findFirst({ where: { backHalf } });
  const isScan = typeof searchParams.scan !== "undefined";
  const caller = appRouter.createCaller({});
  const handleRedirect = async () => {
    if (!link)
      throw new Error(
        "handleRedirect should only be called when link is not null and not expired.",
      );
    await caller.engagements.create({ linkId: link.id, isScan });
    redirect(link.dest, RedirectType.replace);
  };

  return (
    <MaxWidthWrapper className="my-auto">
      {!link ? (
        <Message
          title="Link not found"
          description="The link doesn't seem to exists, maybe you made a typo?"
        />
      ) : link.expiresAt && moment(link.expiresAt).isBefore() ? (
        <Message
          title="Link is expired"
          description="The link you were looking for is no longer available, you can ask the link owner to extend its duration."
        />
      ) : link.password ? (
        <LinkWithPassword link={link} isScan={isScan} />
      ) : (
        handleRedirect()
      )}
    </MaxWidthWrapper>
  );
}

export default ShortenLinkPage;
