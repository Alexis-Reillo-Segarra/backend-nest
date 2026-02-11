import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @IsOptional()
    slug?: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        required: false
    })
    @IsArray()
    @IsOptional()
    images?: string[]

}
