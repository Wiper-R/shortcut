import { BiEditAlt } from "react-icons/bi";
import ActionButton from "./ActionButton";
import { Link as PrismaLink } from "@prisma/client";
import useEditLinkContext from "@/hooks/useEditLinkContext";

const EditActionButton = ({ link }: { link: PrismaLink }) => {
  const { setState } = useEditLinkContext();
  return (
    <ActionButton
      icon={<BiEditAlt />}
      text="Edit"
      onClick={() => setState((state) => ({ ...state, link, isEditing: true }))}
    />
  );
};

export default EditActionButton;
