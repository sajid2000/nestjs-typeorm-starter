import { DataSource } from "typeorm";

import { dbConfig } from "@/lib/config/configs";

const config = dbConfig();

export const connectionSource = new DataSource({
  type: config.driver as "postgres",
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.name,
  synchronize: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/database/migrations"],
  migrationsTableName: "typeorm_migration",
  migrationsRun: false,
});
