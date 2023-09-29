"use client";

import { AlertState } from "@/contexts/alert-context";
import useAlertContext from "@/hooks/useAlertContext";
import { RxCross2 } from "react-icons/rx";

const Alert = ({ message, type }: AlertState) => {
    const { setShowAlert } = useAlertContext();
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
        <div className="absolute right-0 w-max top-full">
            <div
                className={`fixed w-max rounded-md z-50 -translate-x-full -translate-y-full  alert ${classes[_type].element}`}
            >
                <div className="flex p-2">
                    <span className="block p-2 text-base">{message}</span>
                    <button
                        className="self-start text-sm"
                        onClick={() => setShowAlert(false)}
                    >
                        <RxCross2 />
                    </button>
                </div>
                <span
                    className={`block h-0.5 alert-progress ${classes[_type].progress}`}
                ></span>
            </div>
        </div>
    );
};


export default Alert;