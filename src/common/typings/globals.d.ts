import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";

import { IConfig } from "@/lib/config/config.module";
import { UserEntity } from "@/modules/user/entities/user.entity";

interface IRequest extends ExpressRequest {
  user: UserEntity;
  cookies: Record<string, any>;
}

interface IResponse extends ExpressResponse {
  cookie: (key: string, value: string, options: any) => void;
  clearCookie: (key: string) => void;
}

declare global {
  // Using this allows is to quickly switch between express and fastify and others
  export type NestRequest = IRequest;
  export type NestResponse = IResponse;
  export type NestNextFunction = NextFunction;

  export type Configs = IConfig;
}

declare module "express-session" {
  interface SessionData {
    passwordConfirmed: boolean;
    emailVerified: boolean;
  }
}
