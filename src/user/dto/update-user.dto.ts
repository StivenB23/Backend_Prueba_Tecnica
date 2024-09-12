import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNumber()
    @ApiProperty({ description: "the user' email" })
    readonly favorites: number;
}
