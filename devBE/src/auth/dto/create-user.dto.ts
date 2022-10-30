import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AccountTypes } from "../entities/users.entity";

export class CreateUserDto {

    @ApiProperty({description: "identifier(ID)"})
    @IsNotEmpty()
    @IsString()
    identifier: string;

    @ApiProperty({description: "password(raw)"})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({description: "account type: administrator, citizen, millitary"})
    @IsNotEmpty()
    @IsEnum(AccountTypes)
    type: AccountTypes;

    @ApiProperty({description: "user name"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({description: "phone number"})
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({description: "[opt] organization"})
    @IsOptional()
    @IsString()
    organization: string;

    @ApiProperty({description: "[opt] email address"})
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({description: "[opt] address"})
    @IsOptional()
    @IsString()
    address: string;
}