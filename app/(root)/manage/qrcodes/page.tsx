import { useEffect, useState, use } from "react";
import qrcode from "qrcode";
import {createCanvas} from "canvas";

const GenerateQR = async () => {
    const resp = await fetch("http://localhost:3000/api/qrcodes/image?text=MyText")
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    return url;
}

export default async function ManageQRCodes() {
  const dataUrl = await GenerateQR();
  return (
    <>
      Welcome to QRCodes page
      <img src={dataUrl} />
    </>
  );
}
