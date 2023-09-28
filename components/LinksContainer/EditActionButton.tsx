import { BiEditAlt } from "react-icons/bi";
import ActionButton from "./ActionButton";
import { ActionButtonProps } from "./ActionButton/types";

type EditActionButtonProps = Pick<ActionButtonProps, "onClick">;

const EditActionButton = ({ onClick }: EditActionButtonProps) => {
  return <ActionButton icon={<BiEditAlt />} text="Edit" onClick={onClick} />;
};

export default EditActionButton;
