import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
  TOKEN_COOKIE_KEY: z.string(),
});

const env = envSchema.parse(process.env);

export default { ...env };
