import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';
import { AcceptanceStatus, RequestTypes } from '../entities/board.entity';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {

    @IsOptional()
    @IsEnum(RequestTypes)
    @ApiProperty({description: "request types: enviromental, disastor, social, default"})
    type: RequestTypes;

    @IsOptional()
    @IsString()
    @ApiProperty({description: "request title"})
    title: string;

    @IsOptional()
    @IsString()
    @ApiProperty({description: "reqeust concrete description"})
    description: string;

    @IsOptional()
    @IsString()
    @ApiProperty({description: "request location"})
    location: string;
    
    @IsOptional()
    @IsBoolean()
    @ApiProperty({description: "agreement of providing personal information"})
    admit: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({description: "[opt] image of the place"})
    image: string;

    @IsOptional()
    @IsEnum(AcceptanceStatus)
    @ApiProperty({description: "Acceptance Status: pending, accepted, denied"})
    status: AcceptanceStatus;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({description: "done or not" })
    done: boolean;

    @IsOptional()
    @IsObject()
    @ApiProperty({description: "json data of admin/soldier on the request"})
    participants: boolean;

}