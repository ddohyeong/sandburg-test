import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @MinLength(8)
    loginId: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsEmail()
    email:string;
}
