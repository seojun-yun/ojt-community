import { Body } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { PaginationQuery } from "src/common/dto/pagination-query.dto";

export class GetPostByCategoryQuery extends PaginationQuery {
    @IsInt()
    @IsOptional()
    @Type(()=> Number)
    categoryId?: number;
}