import { z } from "zod";

export const createQrCodeSchema = z.object({
  // TODO: add hex validator
  fgColor: z.string().default("#000000"),
  bgColor: z.string().default("#FFFFFF"),

  // TODO: Test with base64 urls
  iconUrl: z.string().url().nullish(),
});
  
export const updateQrCodeSchema = z.object({
  fgColor: z.string().optional(),
  bgColor: z.string().optional(),
  iconUrl: z.string().url().nullish(),
});

export type updateQrCodeSchema = z.infer<typeof updateQrCodeSchema>;



export const listQrCodeSchema = z.object({
  limit: z.coerce.number().min(1).default(10),
  cursor: z.string().optional(),
  search: z.string().optional()
})