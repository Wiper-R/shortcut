"use client";

import getUrl, { formatDateTime } from "@/lib/utils";
import { PrismaLinkWithEngagements } from "@/types";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type LinkContext = {
  link: PrismaLinkWithEngagements;
  setLink: Dispatch<SetStateAction<PrismaLinkWithEngagements>>;
  state: { title: string; dest: URL; shortenUrl: URL };
};

const LinkContext = createContext<LinkContext | null>(null);

const LinkContextProvider = ({
  children,
  ...props
}: PropsWithChildren & { link: PrismaLinkWithEngagements }) => {
  const [link, setLink] = useState<PrismaLinkWithEngagements>(props.link);
  const title =
    link.title || "Untitled " + formatDateTime(new Date(link.createdAt));
  const dest = new URL(link.dest);
  const shortenUrl = getUrl(`/link/${link.backHalf}`);
  return (
    <LinkContext.Provider
      value={{
        link,
        setLink,
        state: { title, dest, shortenUrl },
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => {
  const context = useContext(LinkContext);

  if (!context)
    throw new Error("useLinkContext should be used in LinkContextProvider");

  return context;
};

export default LinkContextProvider;
