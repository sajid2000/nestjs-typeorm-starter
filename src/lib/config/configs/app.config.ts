import { registerAs } from "@nestjs/config";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  APP_ENV: z.enum(["development", "staging", "test", "production"]),
  APP_PORT: z.coerce.number(),
  APP_PREFIX: z.string().optional(),
  APP_NAME: z.string(),
  APP_URL: z.string().url(),
  CLIENT_URL: z.string().url(),
  ALLOWED_ORIGINS: z.string().optional(),
});

const env = schema.parse(process.env);

export const appConfig = registerAs("app", () => ({
  env: env.APP_ENV,
  port: env.APP_PORT,
  prefix: env.APP_PREFIX ?? "api/v1",
  name: env.APP_NAME,
  apiUrl: env.APP_URL,
  clientUrl: env.CLIENT_URL,
  allowedOrigins: env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(",") : "*",
}));
