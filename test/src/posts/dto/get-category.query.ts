import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional } from "class-validator";

export class GetCategoryQuery {
    @IsInt()
    @IsOptional()
    @Type(()=> Number)
    categoryId: number;
}