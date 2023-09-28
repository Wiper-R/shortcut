import { ActionButtonProps } from "./types";

type ActionButtonProps = {
  icon: React.ReactNode,
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionButton = ({ icon, text, onClick }: ActionButtonProps) => {
  return (
    <button
      className="flex gap-1 items-center py-1 px-2 bg-gray-100 border border-gray-200 rounded-md  hover:bg-sky-200"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default ActionButton;
