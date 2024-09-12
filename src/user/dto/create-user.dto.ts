import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: "the user' name" })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: "the user' email" })
  readonly lastname: string;

  @IsEmail()
  @ApiProperty({ description: "the user' email" })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: "the user' email" })
  readonly password: string;

  
}
