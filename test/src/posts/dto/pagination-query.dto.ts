import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class PaginationQuery {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    page: number;

    //TODO per page??
}