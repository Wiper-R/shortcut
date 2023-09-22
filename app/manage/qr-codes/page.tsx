"use client";

import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";

export default async function ManageQRCodes() {
  const { Image } = useQRCode();

  return (
    <>
      Welcome to QRCodes page
      <Image
        text={"https://github.com/bunlong/next-qrcode"}
        options={{
          type: "image/jpeg",
          quality: 0.3,
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#010599FF",
            light: "#FFBF60FF",
          },
        }}
      />
    </>
  );
}
