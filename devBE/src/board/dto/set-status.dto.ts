import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { AcceptanceStatus, RequestTypes } from "../entities/board.entity";

export class SetStatusDto {

    @ApiProperty({ description: "board_idx" })
    @IsNotEmpty()
    @IsNumber()
    board_idx: number;

    @IsOptional()
    @IsEnum(AcceptanceStatus)
    @ApiProperty({ description: "Acceptance Status: pending, accepted, denied" })
    status: AcceptanceStatus;
}