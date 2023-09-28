import { SubmitButtonProps } from "./types";

const FormSubmit = (props: SubmitButtonProps) => {
  return (
    <button
      className="bg-primary text-white font-bold p-4 text-lg rounded-lg lg:text-xl"
      type="submit"
      {...props}
    />
  );
};

export default FormSubmit;
