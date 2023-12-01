"use client";

import { cs } from "@/lib";
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ComponentProps,
} from "react";

const TabContext = createContext<TabContextType | null>(null);

type TabProps = {
  label: string;
  value: string;
};

type TabContextProps = {
  tabs: TabProps[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
} & Omit<ComponentProps<"div">, "children">;

type TabContextType = {
  selected?: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const useTabsContext = () => {
  const context = useContext<TabContextType | null>(TabContext);
  if (!context) throw new Error("Tab should be wrapped inside Tabs");
  return context;
};

export const Tab = (props: TabProps) => {
  const { selected, setSelected } = useTabsContext();
  const isActive = selected === props.value;
  return (
    <button
      type="button"
      className={cs(
        "rounded border bg-white px-5 py-2",
        isActive && "bg-secondary text-primary",
      )}
      onClick={() => setSelected(props.value)}
    >
      {props.label}
    </button>
  );
};

export const Tabs: React.FC<TabContextProps> = ({
  tabs,
  selected,
  setSelected,
  className,
  ...props
}) => {
  return (
    <TabContext.Provider value={{ selected, setSelected }}>
      <div className={cs("flex gap-1", className)} {...props}>
        {tabs.map((tab, index) => (
          <Tab key={index} {...tab} />
        ))}
      </div>
    </TabContext.Provider>
  );
};
