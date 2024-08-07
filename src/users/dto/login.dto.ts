import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'loginId' })
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/, {
        message: '로그인 아이디는 최소 8자리의 영어와 숫자 조합이어야 합니다.'
    })
    loginId: string;

    @ApiProperty({ description: 'password' })
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/, {
        message: '비밀번호는 최소 8자리의 영어, 숫자, 특수문자 조합이어야 합니다.',
    })
    password: string;
}
