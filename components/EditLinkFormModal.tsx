import classNames from "classnames";
import FormInput from "./Shared/FormInput";
import { Link as PrismaLink } from "@prisma/client";

type EditLinkFormModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLinkData: React.Dispatch<React.SetStateAction<PrismaLink | undefined>>;
  linkData?: PrismaLink;
};


const OnSubmit =
  (linkData: PrismaLink | undefined) =>
  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!linkData) return;
    console.log(linkData);
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
  };

const EditLinkFormModal = ({
  setIsModalOpen,
  linkData,
  setLinkData,
}: EditLinkFormModalProps) => {
  return (
    <form
      className={classNames(
        "flex flex-col bg-white p-6 gap-4 max-h-full w-[700px]",
        "rounded-md shadow-md border border-gray-300 overflow-y-auto"
      )}
      onSubmit={OnSubmit(linkData)}
    >
      <h4 className="text-2xl font-semibold">Edit</h4>
      <hr />
      <FormInput id="title" label="Title" name="title" />
      <div className="flex max-xl:space-y-4 max-xl:flex-col xl:justify-center xl:items-center">
        <div className="flex justify-center items-center xl:basis-2/4">
          <FormInput
            label="Domain"
            placeholder="LinkSwift.com"
            id="domain"
            name="domain"
            disabled
          />
          <span className="text-3xl p-4 mt-8 font-extrabold">/</span>
        </div>
        <FormInput
          label="Sub Path"
          placeholder="eg: my-link"
          id="subpath"
          name="subpath"
        />
      </div>
      <div className="flex justify-end gap-3 text-lg">
        <button
          className="px-3 py-1 bg-gray-300 text-black rounded"
          type="button"
          onClick={() => {
            setIsModalOpen(false);
            setLinkData(undefined);
          }}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 bg-primary text-white rounded"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditLinkFormModal;
