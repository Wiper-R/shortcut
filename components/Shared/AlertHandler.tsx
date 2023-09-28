"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

type AlertType = "success" | "error";

type BaseAlert = {
  message: string;
  type: AlertType;
};

export type SetAlertProps = BaseAlert;

type AlertProps = {
  disableAlert: () => void;
} & BaseAlert;


export default function AlertHandler() {
  const params = useSearchParams();
  const router = useRouter();
  const [alertId, setAlertId] = useState(0);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>("success");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | undefined>();
  var _alertMsg = params.get("alertMsg");

  const disableAlert = () => {
    setShowAlert(false);
    clearTimeout(timeoutRef);
  };

  useEffect(() => {
    setAlertId((v) => v + 1);
    if (!_alertMsg) return;
    clearTimeout(timeoutRef);
    const _alertType =
      params.get("alertType") == "success" ? "success" : "error";
    setAlertMsg(_alertMsg);
    setAlertType(_alertType);
    setShowAlert(true);
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("alertType");
    newParams.delete("alertMsg");
    router.push("?" + newParams.toString(), { scroll: false });
    setTimeoutRef(
      setTimeout(() => {
        setShowAlert(false);
      }, 3000)
    );
  }, [_alertMsg]);

  if (!showAlert) {
    return <></>;
  }

  return (
    <Alert
      message={alertMsg || ""}
      type={alertType}
      key={alertId}
      disableAlert={disableAlert}
    />
  );
}

const Alert = ({ message, type, disableAlert }: AlertProps) => {
  const _type = type == "success" ? "success" : "error";
  const classes = {
    success: {
      element: "bg-emerald-200 text-emerald-900",
      progress: "bg-emerald-500",
    },

    error: {
      element: "bg-rose-200 text-rose-900",
      progress: "bg-rose-500",
    },
  };
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 rounded-md z-50 top-20 alert ${classes[_type].element}`}
    >
      <div className="flex p-2">
        <span className="block p-2 text-base">{message}</span>
        <button className="self-start text-sm" onClick={disableAlert}>
          <RxCross2 />
        </button>
      </div>
      <span
        className={`block h-0.5 alert-progress ${classes[_type].progress}`}
      ></span>
    </div>
  );
};
