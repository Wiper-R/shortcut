import { TabProps } from "./types";

const Tab = (props: TabProps) => {
  return (
    <button className="flex max-xl:flex-col xl:space-x-3 items-center px-6 py-3 xl:py-4 bg-white rounded-t-xl border-2 border-b-0 text-xl xl:text-xl text-gray-700">
      {props.icon}
      <span>{props.content}</span>
    </button>
  );
};

export default Tab;
