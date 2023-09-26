"use client";

import { useEffect, useState } from "react";
import LinkEntry from "./linkentry";
import { Link as PrismaLink } from "@prisma/client";

type ActionButtonProps = {
  icon: React.ReactNode;
  text: string;
};

export const ActionButton = ({ icon, text }: ActionButtonProps) => {
  return (
    <button className="flex gap-1 items-center py-1 px-2 bg-gray-200 rounded-md  hover:bg-sky-200">
      {icon}
      <span>{text}</span>
    </button>
  );
};

export const LinkEntries = () => {
  const [links, setLinks] = useState<PrismaLink[]>([]);
  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/links");
      const json = await resp.json();
      setLinks(json);
    })();
  }, []);

  return (
    <section className="flex flex-col gap-5 mt-5">
      {links.map((e) => (
        <LinkEntry key={e.id} {...e} />
      ))}
    </section>
  );
};
