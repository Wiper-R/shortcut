import { z } from "zod";
import bcrypt from "bcrypt";

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

export { signUpSchema, signInSchema };
