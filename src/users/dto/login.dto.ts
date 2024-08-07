import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'loginId' })
    @IsNotEmpty()
    @MinLength(8)
    loginId: string;

    @ApiProperty({ description: 'password' })
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
