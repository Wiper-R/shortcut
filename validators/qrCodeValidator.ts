import { z } from "zod";

export const createQrCodeSchema = z
.object({
  // TODO: add hex validator
  fgColor: z.string().optional(),
  bgColor: z.string().optional(),

  // TODO: Test with base64 urls
  icon: z.string().url().nullish(),
})