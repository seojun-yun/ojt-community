import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { PaginationQuery } from "./pagination-query.dto";

export class GetPostByCategoryQuery extends PaginationQuery {
    @IsInt()
    @IsOptional()
    @Type(()=> Number)
    categoryId: number;
}