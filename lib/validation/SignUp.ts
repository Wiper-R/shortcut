import { z } from "zod";

const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username must contain at least 5 character(s)")
      .regex(
        /^(?!.*[^a-zA-Z0-9-_])[a-zA-Z0-9-_]+$/,
        "Username can only contain alphabet(s), number(s), hyphen(s) and underscore(s)",
      ),
    email: z.string().email("Use a valid email address"),
    password: z.string().min(8, "Password must contain at least 8 character(s)"), // TODO: Check for strong password
  })
  .required();

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export default SignUpSchema;
