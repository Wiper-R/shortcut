import classNames from "classnames";
import FormInput from "../Shared/FormInput";

const EditLinkFormModal = () => {
  return (
    <form
      action=""
      className={classNames(
        "flex flex-col bg-white p-6 gap-4 max-h-full w-[700px]",
        "rounded-md shadow-md border border-gray-300 overflow-y-auto",
      )}
    >
      <h4 className="text-2xl font-semibold">Edit</h4>
      <hr />
      <FormInput id="title" label="Title" name="title" />
      <div className="flex max-xl:space-y-4 max-xl:flex-col xl:justify-center xl:items-center">
        <div className="flex justify-center items-center xl:basis-2/4">
          <FormInput
            label="Domain"
            placeholder="LinkSwift.com"
            disabled={true}
            id="domain"
            name="domain"
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
        <button className="px-3 py-1 bg-gray-300 text-black rounded">
          Cancel
        </button>
        <button className="px-3 py-1 bg-primary text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditLinkFormModal;
