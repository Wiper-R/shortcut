import { HTMLInputTypeAttribute } from "react";

interface IInputProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  id: string;
  name: string;
}

const Input = (props: IInputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-md font-semibold lg:text-lg" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={`w-full px-4 py-3 border-2 rounded-lg border-gray-300 mt-2 text-lg lg:text-xl ${
          props.disabled ? "bg-gray-100" : "bg-white"
        }`}
        type={props.type || "text"}
        placeholder={props.placeholder}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
      />
    </div>
  );
};

export default Input;
