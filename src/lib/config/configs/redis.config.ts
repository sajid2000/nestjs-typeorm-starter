import { registerAs } from "@nestjs/config";
// import { z } from "zod";

// const schema = z.object({
//   REDIS_URI: z.string().url(),
//   REDIS_HOST: z.string(),
//   REDIS_TTL: z.coerce.number().min(1),
//   REDIS_PORT: z.coerce.number(),
//   REDIS_USERNAME: z.string(),
//   REDIS_PASSWORD: z.string(),
// });

// const env = schema.parse(process.env);

export const redisConfig = registerAs("redis", () => ({
  // url: env.REDIS_URI,
  // username: env.REDIS_USERNAME,
  // password: env.REDIS_PASSWORD,
  // host: env.REDIS_HOST,
  // port: env.REDIS_PORT,
  // ttl: env.REDIS_TTL,
}));
