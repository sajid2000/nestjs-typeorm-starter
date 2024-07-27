import { Global, Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import path from "node:path";

import { fileConfig, mailConfig } from "../config/configs";
import { MailerService } from "./mailer.service";

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [mailConfig.KEY, fileConfig.KEY],
      useFactory: async (mailConf: Configs["mail"], fileConfigs: Configs["file"]) => ({
        transport: {
          host: "localhsot" || mailConf.host,
          port: 1025 || mailConf.port,
          ignoreTLS: true,
          secure: false,
          auth: {
            user: mailConf.username,
            pass: mailConf.password,
          },
        },
        defaults: {
          from: `"No Reply"<${mailConf.fromAddress}>`,
        },
        template: {
          dir: path.join(fileConfigs.basePath, "dist/resources/mail-templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: path.join(fileConfigs.basePath, "dist/resources/mail-templates/partials"),
            options: { strict: true },
          },
        },
      }),
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class AppMailerModule {}
