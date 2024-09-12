import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive } from "class-validator";

export class FilterUsersDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: "the user' name", required: false })
  limit: number;

  @IsOptional()
  @ApiProperty({ description: "the user' name", required: false })
  offset: number;
}
