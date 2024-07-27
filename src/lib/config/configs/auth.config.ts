import { registerAs } from "@nestjs/config";
import { z } from "zod";

const schema = z.object({
  COOKIE_SECRET: z.string(),
  CONFIRMATION_TOKEN_SECRET: z.string(),
  CONFIRMATION_TOKEN_EXPIRES: z.coerce.number(),
  BCRYPT_SALT: z.coerce.number(),
  // jwt
  JWT_ALGORITHM: z.string().default("HS256"),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRES: z.coerce.number(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES: z.coerce.number(),
  // oauth
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),

  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CALLBACK_URL: z.string(),
});

const env = schema.parse(process.env);

export const authConfig = registerAs("auth", () => ({
  // email config
  resetPasswordTokenSecret: "secret=/-skajflkajflj=alfdjaljfal=kldfjalkjf/",
  resetPasswordTokenExpires: 5 * 60, // 5 minutes
  confirmTokenSecret: env.CONFIRMATION_TOKEN_SECRET,
  confirmTokenExpires: env.CONFIRMATION_TOKEN_EXPIRES,
  // auth
  cookieSecret: env.COOKIE_SECRET,
  bcryptSalt: env.BCRYPT_SALT,
  jwtAlgorithm: env.JWT_ALGORITHM,
  accessTokenSecret: env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpires: env.JWT_ACCESS_TOKEN_EXPIRES,
  refreshTokenSecret: env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpires: env.JWT_REFRESH_TOKEN_EXPIRES,
  // oauth
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: env.GOOGLE_CALLBACK_URL,
}));
