import { z } from "zod";

// TODO: Add a password check

const signUpSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type signInSchema = z.infer<typeof signInSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;

export { signUpSchema, signInSchema };
