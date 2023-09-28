"use client";

import { useEffect, useState } from "react";
import { Link as PrismaLink } from "@prisma/client";
import LinkCard from "../LinkCard";
import Modal from "../Shared/Modal";
import EditLinkFormModal from "../EditLinkFormModal";

const LinksContainer = () => {
  const [links, setLinks] = useState<PrismaLink[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkData, setLinkData] = useState<PrismaLink>();
  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/links");
      const json = await resp.json();
      setLinks(json);
    })();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-5 my-5 pb-5">
        {links.map((e) => (
          <LinkCard
            key={e.id}
            {...e}
            setIsModalOpen={setIsModalOpen}
            setLinkData={setLinkData}
          />
        ))}
      </section>
      <Modal isOpen={isModalOpen}>
        <EditLinkFormModal
          setIsModalOpen={setIsModalOpen}
          linkData={linkData}
          setLinkData={setLinkData}
        />
      </Modal>
    </>
  );
};

export default LinksContainer;
