import { z } from "zod";

export const createQrCodeSchema = z
.object({
  // TODO: add hex validator
  fgColor: z.string(),
  bgColor: z.string(),

  // TODO: Test with base64 urls
  iconUrl: z.string().url().nullish(),
})