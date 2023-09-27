import { ModalProps } from "./types";
import classNames from "classnames";

const Modal = (props: ModalProps) => {
  return (
    <div
      className={classNames(
        "fixed z-[1000] py-10 inset-0 bg-gray-700",
        "bg-opacity-60 min-h-screen flex items-center justify-center",
        props.isOpen ? "block" : "hidden"
      )}
    >
      {props.children}
    </div>
  );
};

export default Modal;
