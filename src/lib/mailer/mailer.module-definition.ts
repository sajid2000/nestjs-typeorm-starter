import { ConfigurableModuleBuilder } from "@nestjs/common";

import { MailerModuleOptions } from "./interfaces/mailer-options";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN: MAIL_MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<MailerModuleOptions>().setClassMethodName("forRoot").build();
