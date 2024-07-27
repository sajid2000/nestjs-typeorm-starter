import path from "path";

import { registerAs } from "@nestjs/config";
import { z } from "zod";

const schema = z.object({
  FILESYSTEM_DISK: z.enum(["public", "s3"]).default("public"),
  // aws s3
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_DEFAULT_REGION: z.string().optional(),
  AWS_BUCKET: z.string().optional(),
  AWS_URL: z.string().optional(),
});

const env = schema.parse(process.env);

const basePath = process.cwd();

export const fileConfig = registerAs("filesystem", () => ({
  basePath,
  defaultDisk: env.FILESYSTEM_DISK,
  disk: {
    public: {
      dirver: "public",
      rootPath: path.join(basePath, "public"),
      // url: env.NEXT_PUBLIC_API_URL,
    },
    s3: {
      driver: "s3",
      keyId: env.AWS_ACCESS_KEY_ID,
      secret: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_DEFAULT_REGION,
      bucket: env.AWS_BUCKET,
      url: env.AWS_URL,
    },
  },
}));
