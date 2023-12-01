import { PrismaLink } from "@/types";
import { QrCode } from "@prisma/client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type QRCodeContext = {
  qrCode: QrCode;
  link: PrismaLink;
  setQrCode: Dispatch<SetStateAction<QrCode>>;
};

const QRCodeContext = createContext<QRCodeContext | null>(null);

type QRCodeContextProps = {
  qrCode: QrCode;
  link: PrismaLink;
} & PropsWithChildren;

const QRCodeContextProvider = ({
  children,
  link,
  ...props
}: QRCodeContextProps) => {
  const [qrCode, setQrCode] = useState<QrCode>(props.qrCode);
  return (
    <QRCodeContext.Provider value={{ qrCode, link, setQrCode }}>
      {children}
    </QRCodeContext.Provider>
  );
};

const useQRCodeContext = () => {
  const context = useContext(QRCodeContext);
  if (!context)
    throw new Error("useQRCodeContext should be used in QRCodeContextProvider");

  return context;
};

export { useQRCodeContext };

export default QRCodeContextProvider;
