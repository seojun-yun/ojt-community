import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationQuery {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;
    
    @IsOptional()
    @IsInt()
    @Min(5)
    @Max(10)
    @Type(() => Number)
    perPage?: number = 5;
}