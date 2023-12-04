import { z } from "zod";

// TODO: Implement schemas
const createLinkSchema = z.object({
  title: z.string(),
  destination: z.string().url(),
  slug: z.string().min(1), // TODO: Add a slug validator
});

const editLinkSchema = z.object({
  destination: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().nullish().optional(),
});

export { createLinkSchema, editLinkSchema };
