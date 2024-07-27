import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { IsEqualTo } from "@/common/decorators/validators/is-equal-to.decorator";
import { IsPasswordField } from "@/common/decorators/validators/is-password.decorator";

export class ResetPasswordDto {
  @ApiProperty({ example: "abcABC@123" })
  @IsPasswordField()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "abcABC@123" })
  @IsEqualTo("password")
  @IsNotEmpty()
  confirmPassword: string;
}
