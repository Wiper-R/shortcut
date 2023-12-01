"use client";

import { trpc } from "@/app/_trpc/client";
import DashboardPage from "@/components/layouts/DashboardPage";
import ColorInput from "@/components/ui/ColorInput";
import buttonVariants from "@/components/ui/button";
import inputVariants from "@/components/ui/input";
import QRCodeContextProvider, {
  useQRCodeContext,
} from "@/contexts/qrcode-context";
import { formatDate, formatDateTime } from "@/lib/utils";
import { EditQRCodeSchema } from "@/lib/validation/EditQRCode";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  DownloadIcon,
  LinkIcon,
  Loader2,
  PencilIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";

import { QRCodeCanvas } from "qrcode.react";
import {
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import ReactModal from "react-modal";

const QrColorInput = forwardRef(
  <TFieldName extends string>(
    {
      label,
      id,
      value,
      ...props
    }: {
      label: string;
      id: string;
      value: string | null | undefined;
    } & UseFormRegisterReturn<TFieldName>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="mb-1 inline-block text-sm font-medium text-secondary sm:text-base"
        >
          {label}
        </label>
        <div className="flex gap-1">
          <ColorInput id={id} {...props} ref={ref} />
          <input
            type="text"
            className={inputVariants({ class: "w-fit" })}
            value={value || ""}
            disabled
          />
        </div>
      </div>
    );
  },
);

const EditQRModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { qrCode, link, setQrCode } = useQRCodeContext();
  const { register, watch, handleSubmit } = useForm<EditQRCodeSchema>({
    resolver: zodResolver(EditQRCodeSchema),
    defaultValues: {
      bgColor: qrCode.bgColor,
      fgColor: qrCode.fgColor,
      logo: qrCode.logo,
    },
  });
  const { mutateAsync } = trpc.qrcodes.edit.useMutation();
  const handleClose = () => setIsOpen(false);
  const onValid = async (data: EditQRCodeSchema) => {
    try {
      await mutateAsync({ ...data, linkId: link.id });
      handleClose();
      setQrCode({ ...qrCode, ...data });
    } catch (e) {} // TODO: Display error to user
  };

  const onInvalid = (e: any) => {
    console.log(e);
  };
  return (
    <ReactModal isOpen={isOpen} onRequestClose={handleClose}>
      <div className="relative">
        <h4 className="text-xl font-bold">Customize QR Code</h4>
        <button className="absolute right-0 top-0" onClick={handleClose}>
          <XIcon />
        </button>
      </div>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <div className="flex flex-wrap justify-between gap-10 py-4">
          <div className="flex flex-grow flex-col gap-2">
            <QrColorInput
              label="Foreground Color"
              id="fgColor"
              {...register("fgColor")}
              value={watch("fgColor")}
            />
            <QrColorInput
              label="Background Color"
              id="bgColor"
              {...register("bgColor")}
              value={watch("bgColor")}
            />
            <div>
              <label
                htmlFor="logo"
                className="mb-1 block text-sm font-medium text-secondary sm:text-base"
              >
                Logo
              </label>
              <input
                className={inputVariants({})}
                id="logo"
                type="text"
                {...register("logo")}
              />
            </div>
          </div>
          <div className="self-start overflow-visible rounded border">
            <QRCodeCanvas
              value={`http://link.zy/link/${link.backHalf}` + "?qrcode"}
              size={256}
              fgColor={watch("fgColor") || "#000"}
              bgColor={watch("bgColor") || "#fff"}
              imageSettings={{
                src: watch("logo") || "",
                height: 56,
                width: 56,
                excavate: true,
              }}
              includeMargin
              className="!h-40 !w-40"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className={buttonVariants({})}>
            Save
          </button>
          <button
            type="button"
            className={buttonVariants({ type: "secondary" })}
            onClick={handleClose}
          >
            Discard
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

const QRCodeCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { qrCode, link } = useQRCodeContext();

  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState("");
  useEffect(() => {
    if (ref.current) {
      const dataURL = (ref.current.firstChild as HTMLCanvasElement).toDataURL();
      setSource(dataURL);
    }
  }, [ref.current?.firstChild]);
  return (
    <div className="flex items-center gap-4 rounded p-6 shadow">
      <div ref={ref} className="border-border/20 border">
        <QRCodeCanvas
          value={`http://link.zy/link/${link.backHalf}` + "?qrcode"}
          size={256}
          className="!h-full !w-32"
          level="Q"
          imageSettings={{
            src: `http://localhost:3000/_next/image?url=${qrCode.logo}&w=64&q=100`,
            height: 64,
            width: 64,
            excavate: true,
          }}
          fgColor={qrCode.fgColor || ""}
          bgColor={qrCode.bgColor || ""}
          includeMargin
        />
      </div>
      <div className="flex flex-col gap-3">
        <Link
          href=""
          className="line-clamp-1 w-fit break-all text-xl font-semibold"
        >
          {link.title || "Untitled " + formatDateTime(new Date(link.createdAt))}
        </Link>
        <Link
          href={link.dest}
          className="line-clamp-1 w-fit break-all"
          target="_blank"
        >
          <span className="font-semibold">Website:</span> {link.dest}
        </Link>

        <div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="flex items-center gap-1.5 text-sm text-secondary">
              <CalendarIcon className="w-4" />
              <span>{formatDate(link.createdAt)}</span>
            </span>
            <Link
              className="flex items-center gap-1.5 text-sm text-secondary hover:underline"
              href={`http://link.zy/link/${link.backHalf}`}
            >
              <LinkIcon className="w-4" />
              <span>{`http://link.zy/link/${link.backHalf}`}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="ml-auto flex gap-3 self-start">
        <button
          className={buttonVariants({ type: "secondary", size: "sm" })}
          onClick={() => setIsOpen(true)}
        >
          <PencilIcon className="w-4" />
        </button>
        <a
          className={buttonVariants({ type: "secondary", size: "sm" })}
          href={source}
          download={"qrCode-" + link.backHalf + ".png"}
        >
          <DownloadIcon className="w-4" />
          Download
        </a>
      </div>
      <EditQRModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const QRCodesPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    trpc.qrcodes.getAll.useInfiniteQuery(
      { limit: 8 },
      { getNextPageParam: (lastPage, pages) => lastPage.nextPage },
    );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching && hasNextPage) {
        fetchNextPage();
      }
    });

    if (divRef.current) observer.observe(divRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetching, divRef.current]);
  return (
    <DashboardPage heading="QR Codes">
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <Loader2 className="h-10 w-10 animate-spin self-center" />
        ) : data?.pages[0].data.length ? (
          <>
            {data?.pages.map((page) =>
              page.data.map((qrcode) => (
                <QRCodeContextProvider
                  link={qrcode.Link}
                  qrCode={qrcode}
                  key={qrcode.id}
                >
                  <QRCodeCard />
                </QRCodeContextProvider>
                // <QRCodeCard qrCode={qrcode} key={qrcode.id} />
              )),
            )}

            <div className="w-full flex-grow py-4 text-center">
              {isFetching ? (
                <Loader2 className="mx-auto h-10 w-10 animate-spin " />
              ) : !hasNextPage ? (
                <div className="flex items-center">
                  <span className="h-px flex-grow border-b" />
                  <span className="px-4 text-secondary">
                    You have reached the end of QR Codes
                  </span>
                  <span className="h-px flex-grow border-b" />
                </div>
              ) : null}
            </div>
            <div ref={divRef} />
          </>
        ) : (
          <span className="mx-auto mt-10">
            No QR Codes to display{" "}
            <Link href="/dashboard/links" className="text-ascent">
              create a new{" "}
            </Link>{" "}
            QR code for your link
          </span>
        )}
      </div>
    </DashboardPage>
  );
};

export default QRCodesPage;
