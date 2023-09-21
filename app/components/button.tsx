import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<string> {
  text: string;
}

const Button = (props: IButtonProps) => {
  return (
    <button
      className="bg-primary text-white font-bold p-4 text-lg rounded-lg lg:text-xl"
      type={props.type}
    >
      {props.text}
    </button>
  );
};

export default Button;
