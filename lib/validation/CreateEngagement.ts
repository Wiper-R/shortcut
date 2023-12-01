import { COUNTRY_CODES } from "@/constants";
import { z } from "zod";

const CreateEngagementSchema = z.object({
  linkId: z.string().nonempty(),
  isScan: z.boolean().default(false),
});

export default CreateEngagementSchema;
export type CreateEngagementSchemaType = z.infer<typeof CreateEngagementSchema>;
