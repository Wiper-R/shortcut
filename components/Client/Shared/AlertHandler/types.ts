export type AlertType = "success" | "error";

type BaseAlert = {
  message: string;
  type: AlertType;
};

export type SetAlertProps = BaseAlert;
export type AlertProps = {
  disableAlert: () => void;
} & BaseAlert;
