import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { appConfig, authConfig } from "@/lib/config/configs";

import { ForgotPasswordDto } from "../dto/forgot-password.dto";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { UserLoginDto } from "../dto/user-login.dto";
import { UserRegisterDto } from "../dto/user-register.dto";
import { AuthService } from "../services/auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject(appConfig.KEY) private appConfig: Configs["app"],
    @Inject(authConfig.KEY) private authConfig: Configs["auth"],
    private authService: AuthService
  ) {}

  @Post("/register")
  async register(@Req() _req: NestRequest, @Body() dto: UserRegisterDto) {
    await this.authService.register(dto);

    // req.session.emailVerified = false;

    return {
      message: `A email confirmation link has been sent to "${dto.email}"`,
    };
  }

  @Post("/login")
  async login(@Body() dto: UserLoginDto, @Res({ passthrough: true }) res: NestResponse) {
    const data = await this.authService.login(dto.email, dto.password);

    if ("message" in data) return data;

    res.cookie("accessToken", data.accessToken, {
      maxAge: 1000 * this.authConfig.accessTokenExpires,
      httpOnly: true,
      secure: this.appConfig.env === "production",
      path: "/",
    });
    res.cookie("refreshToken", data.refreshToken, {
      maxAge: 1000 * this.authConfig.refreshTokenExpires,
      httpOnly: true,
      secure: this.appConfig.env === "production",
      path: "/",
    });

    return data.user;
  }

  @Post("/logout")
  async logout(@Res({ passthrough: true }) res: NestResponse) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return { message: "Successfully signout" };
  }

  @Post("/resend-verify-link")
  async resendVerifyLink(@Body() { email }: ForgotPasswordDto) {
    return this.authService.resendVerifyLink(email);
  }

  @Get("/activate-account")
  async verifyEmail(@Query("token") token: string) {
    if (!token) throw new BadRequestException("query string 'token' missing");

    await this.authService.verifyEmail(token);

    return { message: "Email address successfully verifed" };
  }

  @Post("/refreshToken")
  async refreshToken(@Req() req: NestRequest, @Res({ passthrough: true }) res: NestResponse) {
    if (!req.cookies) throw new ForbiddenException("Cookies missing");

    // @ts-ignore
    const refreshToken = req.headers.authorization || req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token must be provided with Authorization header or with cookie");
    }

    const accessToken = await this.authService.refreshAccessToken(refreshToken);

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * this.authConfig.accessTokenExpires,
      httpOnly: true,
      secure: this.appConfig.env === "production",
      path: "/",
    });

    return { accessToken };
  }

  @Post("/request-reset-password")
  async requestResetPassword(@Body() { email }: ForgotPasswordDto) {
    return this.authService.sendPasswordResetLink(email);
  }

  @Post("/resetPassword/:token")
  async resetPassword(@Param("token") token: string, @Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(token, dto);

    return { message: "Password successfully updated" };
  }
}
