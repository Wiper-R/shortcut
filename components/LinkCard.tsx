import { BarChart, Calendar, Copy, Edit, PencilIcon, XIcon } from "lucide-react";
import buttonVariants from "./ui/button";
import { copyToClipboard, formatDate, plural } from "@/lib/utils";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { PrismaLinkWithEngagements } from "@/types";
import { useRef, useState } from "react";
import Web from "@/images/world.png";
import EditLinkForm from "./EditLinkForm";
import { cs } from "@/lib";
import LinkContextProvider, { useLinkContext } from "@/contexts/link-context";
import ReactModal from "react-modal";
import { parse } from "tldts";

const Logo = () => {
  const {
    state: { dest },
  } = useLinkContext();

  const baseURL =
    "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=";

  const { domain } = parse(dest.href);
  const [source, setSource] = useState(baseURL + "http://" + domain);
  const fails = useRef(0);

  function handleImageError() {
    if (fails.current == 0) {
      setSource(baseURL + "https://" + domain);
    } else {
      setSource(Web.src);
    }
    fails.current += 1;
  }

  return (
    <div className="flex-shrink-0 self-start rounded-full bg-white p-2">
      <Image
        src={source}
        width={64}
        height={64}
        className="aspect-square h-8 w-8 rounded-full shadow"
        alt={`Logo of ${dest.origin}`}
        quality={100}
        onError={handleImageError}
      />
    </div>
  );
};

/**
 * Renders title, shorten URL, and destination URL.
 */
const LinkDetails = () => {
  const {
    link,
    state: { title, shortenUrl, dest },
  } = useLinkContext();
  return (
    <div className="flex flex-col gap-0.5 lg:max-w-[70%]">
      <Link
        className="line-clamp-1 w-fit break-all text-xl font-semibold underline-offset-2 hover:underline"
        href={`/dashboard/links/${link.backHalf}`}
      >
        {title}
      </Link>
      <Link
        target="_blank"
        href={shortenUrl}
        className="line-clamp-1 w-fit break-all font-medium text-ascent"
      >
        {shortenUrl.toString()}
      </Link>
      <Link
        href={dest}
        className="line-clamp-1 w-fit break-all"
        target="_blank"
      >
        {dest.toString()}
      </Link>
    </div>
  );
};

/**
 * Renders engagements and createdAt.
 */
const LinkInfo = () => {
  const { link } = useLinkContext();
  const engagements = link._count.Engagement;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span
        className={cs(
          "flex items-center gap-1.5 text-sm font-semibold text-secondary-light",
          engagements > 0 && "text-green-700",
        )}
      >
        <BarChart className="w-4" strokeWidth={3} />
        <span>
          {engagements} {plural(engagements, "click")}/
          {plural(engagements, "scan")}
        </span>
      </span>
      <span className="flex items-center gap-1.5 text-sm text-secondary">
        <Calendar className="w-4" />
        <span>{formatDate(link.createdAt)}</span>
      </span>
    </div>
  );
};

const handleCopy = (shortenUrl: URL) => async () => {
  const success = await copyToClipboard(shortenUrl.toString());
  if (success) toast.success("Copied URL to clipboard");
  else toast.error("Failed to copy URL to clipboard");
};

const CopyButton = () => {
  const {
    state: { shortenUrl },
  } = useLinkContext();
  return (
    <button
      className={buttonVariants({
        type: "secondary",
        size: "sm",
      })}
      onClick={handleCopy(shortenUrl)}
    >
      <Copy className="w-4" />
    </button>
  );
};

const EditButton = ({
  setIsEditing,
}: {
  setIsEditing: (v: boolean) => void;
}) => {
  return (
    <button
      className={buttonVariants({
        type: "secondary",
        size: "sm",
      })}
      onClick={() => setIsEditing(true)}
    >
      <PencilIcon className="w-4" />
    </button>
  );
};

const LinkCard = ({ link }: { link: PrismaLinkWithEngagements }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleCloseModal = () => setIsEditing(false);
  return (
    <LinkContextProvider link={link}>
      <div className="flex flex-col gap-4 rounded bg-primary p-4 shadow shadow-shadow/40">
        <div className="flex flex-col gap-2 lg:flex-row">
          <Logo />
          <LinkDetails />
        </div>
        <div className="flex items-center justify-between">
          <LinkInfo />
          {/* Buttons */}
          <div className="flex gap-1">
            <CopyButton />
            <EditButton setIsEditing={setIsEditing} />
          </div>
        </div>

        <ReactModal
          isOpen={isEditing}
          onRequestClose={handleCloseModal}
          parentSelector={() => document.querySelector("#modals")!}
        >
          <button className="absolute right-4" onClick={handleCloseModal}>
            <XIcon />
          </button>
          <EditLinkForm setIsEditing={setIsEditing} />
        </ReactModal>
      </div>
    </LinkContextProvider>
  );
};

export default LinkCard;
