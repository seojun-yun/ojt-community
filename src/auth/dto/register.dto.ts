import { IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string
}