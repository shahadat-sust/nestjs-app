import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from "class-validator";

export class AuthDTO {

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

}