"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertProps, AlertType } from "./types";

export default function AlertHandler() {
  const params = useSearchParams();
  const router = useRouter();
  const [alertId, setAlertId] = useState(0);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>("success");
  var _alertMsg = params.get("alertMsg");
  var timeout: NodeJS.Timeout | null;

  useEffect(() => {
    setAlertId((v) => v + 1);
    if (!_alertMsg) return;
    if (timeout) {
      timeout.refresh();
    }
    const _alertType =
      params.get("alertType") == "success" ? "success" : "error";
    setAlertMsg(_alertMsg);
    setAlertType(_alertType);
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("alertType");
    newParams.delete("alertMsg");
    router.push("?" + newParams.toString());
  }, [_alertMsg]);

  if (!alertMsg) {
    return <></>;
  }

  return <Alert message={alertMsg || ""} type={alertType} key={alertId} />;
}

const Alert = ({ message, type }: AlertProps) => {
  const _type = type == "success" ? "success" : "error";
  const classes = {
    success: {
      element: "bg-green-300 text-green-900 border-green-900",
      progress: "bg-green-900",
    },

    error: {
      element: "bg-red-300 text-red-900 border-red-900",
      progress: "bg-red-900",
    },
  };
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2  border rounded-md z-50 top-20 alert ${classes[_type].element}`}
    >
      <span className="p-3 block">{message}</span>
      <span
        className={`block h-0.5 alert-progress ${classes[_type].progress}`}
      ></span>
    </div>
  );
};
