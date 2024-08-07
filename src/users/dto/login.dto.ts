import {IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    
    @IsNotEmpty()
    @MinLength(8)
    loginId: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
