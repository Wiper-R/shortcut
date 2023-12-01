import { trpc } from "@/app/_trpc/client";
import ColorInput from "@/components/ui/ColorInput";
import Switch from "@/components/ui/Switch";
import buttonVariants from "@/components/ui/button";
import inputVariants from "@/components/ui/input";
import {
  CreateLinkSchema,
  CreateLinkSchemaType,
} from "@/lib/validation/ManageLink";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { Loader2Icon, SlashIcon } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateSingleLink = () => {
  const [canFetchTitle, setCanFetchTitle] = useState(false);
  const {
    register,
    formState,
    handleSubmit,
    watch,
    control,
    getFieldState,
    getValues,
    setValue,
  } = useForm<CreateLinkSchemaType>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: { QRCode: { bgColor: "#ffffff", fgColor: "#000000" } },
  });
  const { data: titleData } = trpc.private.title.useQuery(
    {
      url: watch("dest"),
    },
    { enabled: canFetchTitle, retry: 0 },
  );

  const { data, mutateAsync, error } = trpc.links.create.useMutation();
  const onValid = async (formData: CreateLinkSchemaType) => {
    try {
      const data = await trpcUtils.private.title.ensureData({
        url: getValues("dest"),
      });
      formData.title = formData.title || data.title || "";
    } catch (e) {}
    try {
      await mutateAsync(formData);
      toast.success("Url has been shortened");
    } catch (e) {
      if (e instanceof TRPCClientError) toast.error(e.message);
    }
  };

  const onInvalid = (data: FieldErrors<CreateLinkSchemaType>) => {
    console.log("Invalid: ", data);
  };

  const trpcUtils = trpc.useContext();

  const onDestinationBlur = () => {
    if (getFieldState("title").isTouched) {
      console.log("Returning Title Touched");
      return;
    }

    const destinationFieldState = getFieldState("dest");
    if (!destinationFieldState.isDirty || destinationFieldState.invalid) {
      return;
    }
    setCanFetchTitle(true);
    trpcUtils.private.title.invalidate();
  };

  useEffect(() => {
    const titleState = getFieldState("title");
    if (!titleState.isDirty) {
      const title = titleData?.title || "";
      setValue("title", title, { shouldDirty: false });
    }
  }, [titleData, watch("title")]);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <div>
        <label
          htmlFor="destination"
          className="mb-1 block text-sm font-medium text-secondary sm:text-base"
        >
          Destination
        </label>
        <input
          className={inputVariants({})}
          id="destination"
          {...register("dest", { onBlur: onDestinationBlur })}
        />
      </div>
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-secondary sm:text-base"
        >
          Title
        </label>
        <input
          className={inputVariants({})}
          id="title"
          {...register("title")}
        />
      </div>
      <div>
        <div className="flex flex-col gap-y-5 lg:flex-row">
          <div>
            <label
              htmlFor="longUrl"
              className="mb-1 block text-sm font-medium text-secondary sm:text-base"
            >
              Domain
            </label>
            <div className="flex items-center">
              <input
                type="text"
                className={inputVariants({})}
                disabled
                value="link.zy/link"
              />
              <SlashIcon className="w-20 -rotate-12" />
            </div>
          </div>
          <div className="flex-grow">
            <label
              htmlFor="backHalf"
              className="mb-1 block text-sm font-medium text-secondary sm:text-base"
            >
              Back Half (Optional)
            </label>
            <input
              className={inputVariants({})}
              id="backHalf"
              {...register("backHalf")}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-2 font-medium sm:gap-x-4">
        <Switch name="hasPassword" control={control} id="hasPassword" />
        <label
          htmlFor="hasPassword"
          className="text-sm font-medium text-secondary sm:text-base"
        >
          Protect with password
        </label>
      </div>
      {watch("hasPassword") && (
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-secondary sm:text-base"
          >
            Password
          </label>
          <input
            className={inputVariants({})}
            id="password"
            type="password"
            {...register("password")}
          />
        </div>
      )}
      <div className="flex items-center gap-x-2 font-medium sm:gap-x-4">
        <Switch control={control} name="hasExpiry" id="hasExpiry" />
        <label
          htmlFor="hasExpiry"
          className="text-sm font-medium text-secondary sm:text-base"
        >
          Temporary
        </label>
      </div>
      {watch("hasExpiry") && (
        <div>
          <label
            htmlFor="expires"
            className="mb-1 block text-sm font-medium text-secondary sm:text-base"
          >
            Expires
          </label>
          <input
            className={inputVariants({})}
            id="expires"
            type="datetime-local"
            {...register("expires")}
          />
        </div>
      )}
      <div className="flex items-center gap-x-2 font-medium sm:gap-x-4">
        <Switch control={control} name="hasQRCode" id="hasQRCode" />
        <label
          htmlFor="hasQRCode"
          className="text-sm font-medium text-secondary sm:text-base"
        >
          QR Code
        </label>
      </div>
      {watch("hasQRCode") && (
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex flex-grow flex-col gap-2">
            <div>
              <label
                htmlFor="fgColor"
                className="mb-1 block text-sm font-medium text-secondary sm:text-base"
              >
                Foreground Color
              </label>
              <div className="flex gap-1">
                <ColorInput id="fgColor" {...register("QRCode.fgColor")} />
                <input
                  type="text"
                  className={inputVariants({ class: "w-fit" })}
                  value={watch("QRCode.fgColor") || ""}
                  disabled
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="bgColor"
                className="mb-1 block text-sm font-medium text-secondary sm:text-base"
              >
                Background Color
              </label>
              <div className="flex gap-1">
                <ColorInput id="bgColor" {...register("QRCode.bgColor")} />
                <input
                  type="text"
                  className={inputVariants({ class: "w-fit" })}
                  value={watch("QRCode.bgColor") || ""}
                  disabled
                />
              </div>
            </div>
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
                {...register("QRCode.logo")}
              />
            </div>
          </div>

          <QRCodeCanvas
            value="QRCode Prototype"
            size={128}
            fgColor={watch("QRCode.fgColor") || "#000"}
            bgColor={watch("QRCode.bgColor") || "#fff"}
            imageSettings={{
              src: watch("QRCode.logo") || "",
              height: 32,
              width: 32,
              excavate: true,
            }}
          />
        </div>
      )}

      <button
        className={buttonVariants({ className: "w-full" })}
        disabled={formState.isSubmitting}
        type="submit"
      >
        {formState.isSubmitting && (
          <Loader2Icon className="w-4 animate-spin" strokeWidth={3} />
        )}
        Create New Link
      </button>
    </form>
  );
};

export default CreateSingleLink;
