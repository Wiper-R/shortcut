import { z } from "zod";

const LWP = z.object({
  password: z.string().nonempty({ message: "Password should not be empty" }),
});

export default LWP;
export type LWPSchemaType = z.infer<typeof LWP>;
