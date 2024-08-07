import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'loginId' })
    @IsNotEmpty()
    @MinLength(8)
    loginId: string;

    @ApiProperty({ description: 'password' })
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ description: 'email' })
    @IsEmail()
    email:string;
}
