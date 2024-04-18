import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationQuery {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    //TODO perPage

    @IsOptional()
    @IsInt()
    @Min(5)
    @Type(() => Number)
    perPage?: number = 5;
}