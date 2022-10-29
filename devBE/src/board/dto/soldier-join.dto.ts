import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class SoldierJoinDto {
    
    // @IsNotEmpty()
    // @IsString()
    // @ApiProperty({description: "identifier"})
    // identifier: string;

    @ApiProperty({description: "something"})
    @IsNotEmpty()
    @IsNumber()
    board_idx: number;

    @ApiProperty({description: "something"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({description: "something"})
    @IsNotEmpty()
    @IsString()
    unit: string;

    @ApiProperty({description: "something"})
    @IsNotEmpty()
    @IsString()
    serial_number: string;

    @ApiProperty({description: "something"})
    @IsNotEmpty()
    @IsString()
    password: string;

}