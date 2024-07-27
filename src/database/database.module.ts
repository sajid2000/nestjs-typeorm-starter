import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "node:path";

import { dbConfig } from "../lib/config/configs";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: async (config: Configs["db"]) => ({
        type: config.driver as "postgres",
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.name,
        synchronize: true,
        autoLoadEntities: true,
        entities: [path.join(__dirname, "..", "**", "*.entity{.ts,.js}")],
      }),
    }),
  ],
})
export class DatabaseModule {}
