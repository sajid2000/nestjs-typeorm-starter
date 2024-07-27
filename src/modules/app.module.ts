import { CacheModule } from "@nestjs/cache-manager";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { IsUniqueConstraint } from "@/common/decorators/validators/is-unique.decorator";
import { EntityNotfoundExceptionsFilter } from "@/common/filters/entity-notfound-exceptions.filter";
import { DatabaseModule } from "@/database/database.module";
import { AppMailerModule } from "@/lib/mailer/mailer.module";

import { MyConfigModule } from "../lib/config/config.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    MyConfigModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 5 * 1000, // 5 seconds
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    AppMailerModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IsUniqueConstraint,
    {
      provide: APP_FILTER,
      useClass: EntityNotfoundExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }
  ],
})
export class AppModule {}
