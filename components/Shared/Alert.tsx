"use client";

import { AlertKind, AlertState } from "@/contexts/alert-context";
import useAlertContext from "@/hooks/useAlertContext";
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { IconType } from "react-icons";
import classNames from "classnames";

type AlertStyle = {
  [type in AlertKind]: {
    icon: IconType;
    colorClass: string;
  };
};

const alertStyles: AlertStyle = {
  success: {
    icon: BsCheckLg,
    colorClass: "bg-green-500",
  },
  error: {
    icon: RxCross2,
    colorClass: "bg-red-500",
  },
};

const Alert = ({ message, type }: AlertState) => {
  const { setShowAlert } = useAlertContext();
  const _type = type == "success" ? "success" : "error";
  return (
    <div className="relative flex max-w-[400px] bg-white drop-shadow-sm py-2 pb-3 px-4 rounded-md gap-4 border border-neutral-100">
      <span
        className={classNames(
          `w-full absolute bottom-0 left-0 h-1 alert-progress`,
          alertStyles[type].colorClass
        )}
      ></span>
      <span
        className={classNames(
          `p-1 rounded-full self-start text-white text-sm`,
          alertStyles[type].colorClass
        )}
      >
        {alertStyles[type].icon({})}
      </span>
      <div className="flex flex-col w-full self-start">
        <span className="text-lg font-semibold capitalize">{type}</span>
        <span className="text-sm text-neutral-500">{message}</span>
      </div>
      <button
        className="text-xl text-neutral-500 self-start pointer-events-auto"
        onClick={() => setShowAlert(false)}
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default Alert;
