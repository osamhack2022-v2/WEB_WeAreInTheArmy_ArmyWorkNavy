import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthCredentialsDto {

    @ApiProperty({description: "identifier(ID)"})
    @IsNotEmpty()
    @IsString()
    identifier: string;

    @ApiProperty({description: "password(raw)"})
    @IsNotEmpty()
    @IsString()
    
    password: string;
}