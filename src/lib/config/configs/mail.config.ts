import { registerAs } from "@nestjs/config";
import { z } from "zod";

const schema = z.object({
  // MAIL_DRIVER: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_USERNAME: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_ENCRYPTION: z.string(),
  SUPPORT_MAIL_ADDRESS: z.string().email(),
  MAIL_FROM_ADDRESS: z.string().email(),
  MAIL_FROM_NAME: z.string(),
});

const env = schema.parse(process.env);

export const mailConfig = registerAs("mail", () => ({
  // driver: env.MAIL_DRIVER,
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  username: env.MAIL_USERNAME,
  password: env.MAIL_PASSWORD,
  encryption: env.MAIL_ENCRYPTION,
  fromAddress: env.MAIL_FROM_ADDRESS,
  fromName: env.MAIL_FROM_NAME,
  supportAddress: env.SUPPORT_MAIL_ADDRESS,
}));
