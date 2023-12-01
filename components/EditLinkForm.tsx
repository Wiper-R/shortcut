import { trpc } from "@/app/_trpc/client";
import {
  EditLinkSchema,
  EditLinkSchemaType,
} from "@/lib/validation/ManageLink";
import { TRPCClientError } from "@trpc/client";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLinkContext } from "@/contexts/link-context";
import { useEffect } from "react";
import { formatDatetimeLocalInput } from "@/lib/utils";
import buttonVariants from "./ui/button";
import { Loader2Icon, SlashIcon } from "lucide-react";
import inputVariants from "./ui/input";
import Switch from "./ui/Switch";

type EditLinkFormProps = {
  setIsEditing: (v: boolean) => void;
};

const EditLinkForm = ({ setIsEditing }: EditLinkFormProps) => {
  const { link, setLink } = useLinkContext();

  const { register, formState, watch, setValue, handleSubmit, control } =
    useForm<EditLinkSchemaType>({
      resolver: zodResolver(EditLinkSchema),
      defaultValues: {
        backHalf: link.backHalf,
        dest: link.dest,
        expires: link.expiresAt && formatDatetimeLocalInput(link.expiresAt),
        hasExpiry: link.expiresAt !== null,
        hasPassword: link.password !== null,
        password: link.password,
      },
    });

  useEffect(() => {
    if (link.title) {
      setValue("title", link.title, { shouldTouch: true });
    }
  }, []);

  const { data, mutateAsync, error } = trpc.links.edit.useMutation();
  const onValid = async (formData: EditLinkSchemaType) => {
    if (!link) return;
    try {
      const data = await mutateAsync({ ...formData, id: link.id });
      setLink((link) => ({ ...link, ...data }));
      setIsEditing(false);
      toast.success("URL has been updated");
    } catch (e) {
      if (e instanceof TRPCClientError) toast.error(e.message);
    }
  };

  const onInvalid = (data: any) => {
    console.log("Invalid: ", data);
  };
  return (
    <div className="sm:px-8">
      <h4 className="text-xl font-bold">Edit Link</h4>
      <div className="py-4">
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
              {...register("dest")}
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

          <button
            className={buttonVariants({ className: "w-full" })}
            disabled={formState.isSubmitting}
            type="submit"
          >
            {formState.isSubmitting && (
              <Loader2Icon className="w-4 animate-spin" strokeWidth={3} />
            )}
            Edit Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLinkForm;
