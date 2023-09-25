import { NextResponse, NextRequest } from "next/server";
import qrcode from "qrcode";
import { Canvas, loadImage } from "canvas";

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");
  if (!text) {
    return NextResponse.json(null);
  }

  const canvas = new Canvas(100, 100);
  const ctx = canvas.getContext("2d");
  await qrcode.toCanvas(canvas, text, {
    margin: 2,
    width: 250,
    errorCorrectionLevel: "H",
  });
  const req = await fetch(
    "https://o.remove.bg/downloads/5ade3120-0fc1-49f7-b2c0-68992b76d8be/png-transparent-logo-netflix-logos-and-brands-icon-removebg-preview.png"
  );

  const data = await req.arrayBuffer();
  const buffer = Buffer.from(data);
  const img = await loadImage(buffer);
  ctx.fillStyle = "#fff";
  ctx.fillRect(88, 88, 76, 76);
  ctx.drawImage(img, 90, 90, 72, 72);
  return new NextResponse(canvas.toBuffer("image/png"), {
    headers: { "Content-Type": "image/png" },
  });
}
