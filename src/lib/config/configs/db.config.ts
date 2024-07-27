import { registerAs } from "@nestjs/config";
import { z } from "zod";

const schema = z.object({
  DB_DRIVER: z.enum(["mysql", "mariadb", "postgres"]),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
});

const env = schema.parse(process.env);

export const dbConfig = registerAs("database", () => ({
  driver: env.DB_DRIVER,
  host: env.DB_HOST,
  port: env.DB_PORT,
  name: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
}));
