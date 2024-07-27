import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService, ConfigType } from "@nestjs/config";

import { appConfig, authConfig, dbConfig, fileConfig, mailConfig, redisConfig } from "./configs";

export interface IConfig {
  app: ConfigType<typeof appConfig>;
  auth: ConfigType<typeof authConfig>;
  db: ConfigType<typeof dbConfig>;
  file: ConfigType<typeof fileConfig>;
  mail: ConfigType<typeof mailConfig>;
  redis: ConfigType<typeof redisConfig>;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, authConfig, dbConfig, fileConfig, mailConfig, redisConfig],
      cache: true,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class MyConfigModule {}
