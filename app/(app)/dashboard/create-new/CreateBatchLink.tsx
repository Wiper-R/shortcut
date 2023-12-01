"use client";
import inputVariants from "@/components/ui/input";
import Select, { SingleValue } from "react-select";
import { FormEvent, useEffect, useState } from "react";
import buttonVariants from "@/components/ui/button";
import { trpc } from "@/app/_trpc/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2Icon, XIcon } from "lucide-react";
import ReactModal from "react-modal";
import Papa from "papaparse";
import { PrismaLink } from "@/types";
import Switch from "@/components/ui/Switch";

const BatchLinkInput = z.object({
  rawInput: z.string(),
  skipMetadata: z.boolean().default(false),
});

type BatchLinkInput = z.infer<typeof BatchLinkInput>;

function csvToDataUrl(csv: string) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  return url;
}

export const CreateBatchLink = () => {
  const options = [
    { label: "Direct Input", value: "input" },
    { label: "Upload a file", value: "upload" },
  ];
  const [value, setValue] = useState<SingleValue<(typeof options)[0]>>(
    options[0],
  );

  const utils = trpc.useContext();

  const [completedCount, setCompletedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { mutateAsync } = trpc.links.create.useMutation({
    onSuccess: () => setCompletedCount((c) => c + 1),
    onError: () => setErrorCount((c) => c + 1),
    retry: 0,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { isSubmitting },
  } = useForm<BatchLinkInput>({
    resolver: zodResolver(BatchLinkInput),
    defaultValues: { skipMetadata: true },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleCloseModal = () => setIsOpen(false);

  async function onValid(data: BatchLinkInput) {
    const validLinks: string[] = [];
    data.rawInput.split("\n").forEach((link) => {
      try {
        const url = new URL(link);
        validLinks.push(url.toString());
      } catch (e) {}
    });
    const processedLinks: (Partial<PrismaLink> & { success: boolean })[] = [];
    setTotalCount(validLinks.length);
    for (const link of validLinks) {
      var title: string | null = null;

      if (!data.skipMetadata) {
        try {
          const data = await utils.private.title.ensureData(
            { url: link },
            { retry: 0 },
          );
          title = data.title;
        } catch (e) {}
      }

      try {
        const processed = await mutateAsync({
          dest: link,
          title,
        });

        processedLinks.push({
          dest: processed.dest,
          success: true,
          title: processed.title,
          createdAt: processed.createdAt,
          backHalf: processed.backHalf,
        });
      } catch (e) {
        processedLinks.push({ dest: link, success: false });
      }
    }

    setDownloadUrl(csvToDataUrl(Papa.unparse(processedLinks)));
    setIsOpen(true);
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onValid)}>
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="rawInput"
        >
          Enter or paste your URLs here:
        </label>
        <textarea
          className={inputVariants({})}
          rows={8}
          wrap="off"
          id="rawInput"
          {...register("rawInput")}
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch control={control} name="skipMetadata"/>
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="skipMetadata"
        >
          Skip MetaData (Faster Processing)
        </label>
      </div>
      <p className="text-sm text-secondary">
        <span className="font-semibold ">Note:</span>{" "}
        {watch("skipMetadata")
          ? `Skipping metadata may result in incomplete or inaccurate link information (but faster processing time).`
          : `Batch processing may take time as each link requires crawling to retrieve metadata like titles and icons, ensuring accurate and meaningful information. Please be patient.`}
      </p>
      <button
        className={buttonVariants({})}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2Icon className="w-4 animate-spin" />
            {`Processed ${completedCount}/${totalCount}`}
          </>
        ) : (
          "Shorten All Links"
        )}
      </button>

      <ReactModal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <div className="flex flex-col items-start gap-2">
          <button className="absolute right-4" onClick={handleCloseModal}>
            <XIcon />
          </button>
          {completedCount > 0 && downloadUrl ? (
            <>
              <span>Your links are ready to be downloaded</span>
              <a
                href={downloadUrl}
                download="links.csv"
                className={buttonVariants({})}
              >
                Download
              </a>
            </>
          ) : (
            <>
              <h4 className="text-xl font-bold">Error Processing Links</h4>
              <span className="text-sm">Couldn't process any link</span>
            </>
          )}
        </div>
      </ReactModal>
    </form>
  );
};
