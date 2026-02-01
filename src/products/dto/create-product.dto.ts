import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @MinLength(1)
    @IsOptional()
    slug?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString()
    @IsOptional()
    description?: string;

}
