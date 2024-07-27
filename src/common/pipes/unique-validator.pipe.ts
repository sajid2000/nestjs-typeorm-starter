import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { EntityManager, EntitySchema, ObjectType } from "typeorm";

interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [ObjectType<E> | EntitySchema<E> | string];
}

/**
 * unique validator pipe
 */
@ValidatorConstraint({ name: "unique", async: true })
@Injectable()
export class UniqueValidatorPipe {
  constructor(@InjectEntityManager() protected em: EntityManager) {}

  /**
   * validate method to validate provided condition
   * @param value
   * @param args
   */
  async validate<E>(value: string, args: UniqueValidationArguments<E>) {
    const [EntityClass] = args.constraints;

    const exists = await this.em.getRepository(EntityClass).exists({
      where: { [args.property]: value },
    });

    return !exists;
  }

  /**
   * default message
   * @param args
   */
  defaultMessage(args: ValidationArguments) {
    return `${args.property} '${args.value}' already exists`;
  }
}
