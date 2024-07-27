import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UniqueValidatorPipe } from "@/common/pipes/unique-validator.pipe";

import { RoleRepository } from "./repositories/role.repository";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, UniqueValidatorPipe],
  exports: [RoleService],
})
export class RoleModule {}
