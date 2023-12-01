import { z } from "zod";

export const CreateQRCode = z.object({
  linkId: z.string().nonempty(),
  fgColor: z.string().min(4).max(9).regex(/^#/).default("#000"),
  bgColor: z.string().min(4).max(9).regex(/^#/).default("#fff"),
  logo: z.string().url().nullish(),
});
