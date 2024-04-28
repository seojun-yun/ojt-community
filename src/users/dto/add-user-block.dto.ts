import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class AddUserBlockDto {
    @IsNumber()
    @Type(() => Number)
    targetUserId: number;
}