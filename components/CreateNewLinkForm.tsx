"use client";

import FormInput from "./Shared/FormInput";
import FormSubmit from "./Shared/FormSubmit";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { ManageCreateNewLink_POST } from "@/validators";
import { AlertState } from "@/contexts/alert-context";
import useAlertContext from "@/hooks/useAlertContext";

type dispatchType = Dispatch<SetStateAction<AlertState>>;

const OnSubmit = ({ setAlert }: { setAlert: dispatchType }) => {
  const Wrapper = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await ManageCreateNewLink_POST.validateAsync(
      Object.fromEntries(formData.entries())
    );

    const resp = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify(result),
    });

    if (resp.ok) {
      setAlert({
        message: "Your url is shortened",
        type: "success",
      });
    } else if (resp.status === 422) {
      const message = `Subpath "${formData.get(
        "subpath"
      )}" already exist, try something else.`;
      setAlert({
        message,
        type: "error",
      });
    } else {
      setAlert({ message: "An unknown error occurred", type: "error" });
    }
  };

  return Wrapper;
};

const CreateNewLinkForm = () => {
  const { setAlert } = useAlertContext();
  return (
    <form
      action=""
      className="flex flex-col gap-4 mt-8"
      onSubmit={OnSubmit({ setAlert })}
    >
      <FormInput
        label="URL"
        id="url"
        name="url"
        placeholder="eg: https://www.your-long-url.com/short-it"
      />
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
          label="Sub Path (Optional)"
          placeholder="eg: my-link"
          id="subpath"
          name="subpath"
        />
      </div>
      <FormSubmit>Create</FormSubmit>
    </form>
  );
};

export default CreateNewLinkForm;
