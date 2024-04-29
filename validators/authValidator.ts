import { z } from "zod";

// TODO: Add a password check

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const changePasswordSchema = z.object({
  old: z.string(),
  new: z.string().min(1),
});

export type signInSchema = z.infer<typeof signInSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
export type changePasswordSchema = z.infer<typeof changePasswordSchema>;
