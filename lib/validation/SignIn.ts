import { z } from "zod";

const SignInSchema = z.object({
  username: z.string(),
  password: z.string(), // Check for strong password
}).required();

export default SignInSchema;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
