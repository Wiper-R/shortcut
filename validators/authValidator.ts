import { z } from "zod";

// TODO: Add a password check

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updatePasswordSchema = z.object({
  old: z.string().min(6),
  new: z.string().min(6),
})

export type signInSchema = z.infer<typeof signInSchema>;
export type signUpSchema = z.infer<typeof signUpSchema>;
export type updatePasswordSchema = z.infer<typeof updatePasswordSchema>;

