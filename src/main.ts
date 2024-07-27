import "@total-typescript/ts-reset";

import path from "path";

import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { useContainer } from "class-validator";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import * as express from "express";

import { AppUtils } from "./common/helpers/app.utils";
import { AppModule } from "./modules/app.module";

dotenv.config();

const logger = new Logger("Bootstrap");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService<Configs, true>);
  const appConfig = configService.get("app", { infer: true });
  const isProduction = appConfig.env === "production";
  const API_PREFIX = "api/v1";
  const PORT = appConfig.port;

  // ======================================================================
  // - Security
  // ======================================================================
  app.enable("trust proxy");
  app.set("etag", "strong");
  app.enableCors({ credentials: true, origin: appConfig.allowedOrigins });
  app.use(cookieParser(configService.get("auth.cookieSecret", { infer: true })));

  // ======================================================================
  // - global pipes, filters, interceptors
  // ======================================================================
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(new ValidationPipe(AppUtils.validationPipeOptions()));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // ======================================================================
  // - swagger
  // ======================================================================
  if (!isProduction) {
    AppUtils.setupSwagger(app, configService);
  }

  // ======================================================================
  // - shutdown hooks
  // ======================================================================
  app.enableShutdownHooks();
  AppUtils.killAppWithGrace(app);

  // ======================================================================
  // - public assets route
  // ======================================================================
  app.use("/public", express.static(path.resolve("public")));

  await app.listen(PORT);

  logger.log("==========================================================");
  logger.log(`🚀 Application is running on: http://localhost:${PORT}/${API_PREFIX}`);

  if (!isProduction) {
    logger.log("==========================================================");
    logger.log(`📑 Swagger is running on: http://localhost:${PORT}/doc`);
  }
}

try {
  (async () => await bootstrap())();
} catch (error) {
  logger.error(error);
}
