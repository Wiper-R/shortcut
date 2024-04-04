import { z } from "zod";
import { createQrCodeSchema } from "./qrCodeValidator";

// TODO: Implement schemas
const createLinkSchema = z.object({
  title: z.string().optional(),
  destination: z.string().url(),
  url: z.string().url().optional(),
  slug: z.string().optional(), // TODO: Add a slug validator
  generateQrCode: z.boolean().default(false),
  qrCode: createQrCodeSchema.optional(),
});

const updateLinkSchema = z.object({
  destination: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().nullable().optional(),
});

const listLinkSchema = z.object({
  limit: z.coerce.number().min(1).default(10),
  cursor: z.string().optional(),
  search: z.string().optional(),
});

export type createLinkSchema = z.infer<typeof createLinkSchema>;
export type updateLinkSchema = z.infer<typeof updateLinkSchema>;

export { createLinkSchema, updateLinkSchema, listLinkSchema };
