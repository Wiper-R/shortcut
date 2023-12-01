import { z } from "zod";

const CreateQRCodeSchema = z.object({
  fgColor: z.string().min(4).max(9).regex(/^#/).default("#000000"),
  bgColor: z.string().min(4).max(9).regex(/^#/).default("#ffffff"),
  logo: z.string().nullish(),
});

const EditQRCodeSchema = CreateQRCodeSchema.extend({
});

export type CreateQRCodeSchema = z.infer<typeof CreateQRCodeSchema>;
export type EditQRCodeSchema = z.infer<typeof EditQRCodeSchema>;
export { CreateQRCodeSchema, EditQRCodeSchema };
