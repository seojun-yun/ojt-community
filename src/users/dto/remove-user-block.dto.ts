import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class RemoveUserBlockDto {
    @IsNumber()
    @Type(() => Number)
    targetUserId: number;
}