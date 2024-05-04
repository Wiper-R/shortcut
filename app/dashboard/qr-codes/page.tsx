import { getSession } from "@/auth";
import { QRCodeContainer } from "./qrcode-container";
import { Search } from "@/components/search";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <div>
      <Search />
      <QRCodeContainer />
    </div>
  );
}
