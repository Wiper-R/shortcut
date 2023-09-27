import { SetAlertProps } from "@/components/Client/Shared/AlertHandler/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAlert = () => {
  const [alert, setAlert] = useState<SetAlertProps>({
    message: "",
    type: "success",
  });

  const router = useRouter();
  const params = useSearchParams();
  const newParams = new URLSearchParams(params.toString());
  newParams.set("alertType", alert.type);
  newParams.set("alertMsg", alert.message);

  useEffect(() => {
    if (!alert.message) return;
    router.push("?" + newParams.toString(), { scroll: false });
  }, [alert]);

  return { alert, setAlert };
};
export default useAlert;
