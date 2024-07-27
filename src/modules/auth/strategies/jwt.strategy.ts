import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AccessTokenPayload } from "@/common/@types";
import { authConfig } from "@/lib/config/configs";
import { UserService } from "@/modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @Inject(authConfig.KEY) authConfig: Configs["auth"],
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: any) => {
          if (req.cookies && req.cookies.accessToken?.length > 0) {
            return req.cookies.accessToken;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: authConfig.accessTokenSecret,
    });
  }

  /**
   * Validate the token and return user entity
   *
   * @param payload string
   */
  async validate(payload: AccessTokenPayload) {
    const { email } = payload;

    return this.userService.findByEmail(email);
  }
}
