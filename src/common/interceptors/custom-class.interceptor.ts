import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
  new (...arg: any[]): {};
}

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new CustomClassInterceptor(dto));
}

@Injectable()
export class CustomClassInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (Array.isArray(data)) {
          return data.map((item) => plainToInstance(this.dto, item, { excludeExtraneousValues: true }));
        }

        return plainToInstance(this.dto, data, { excludeExtraneousValues: true });
      })
    );
  }
}
