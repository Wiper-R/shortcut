import { z } from "zod";

const GetAllLinks = z.object({
  limit: z.number().min(1).max(100).default(10),
  search: z.string().nullish(),
  cursor: z.string().nullish(),
});

export default GetAllLinks;
export type GetAllLinksSchemaType = z.infer<typeof GetAllLinks>;
