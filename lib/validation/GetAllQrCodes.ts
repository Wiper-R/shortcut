import { z } from "zod";

const GetAllQrCodes = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.string().nullish(),
});

export default GetAllQrCodes;
