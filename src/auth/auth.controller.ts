import { Controller, Post, Body, Request, UseGuards, UnauthorizedException, Get, BadRequestException, Res, HttpStatus, Delete, HttpException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly usersService:UsersService
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {

        const user = await this.authService.validateUser(loginDto.loginId, loginDto.password);
        
        if (!user) {
            throw new UnauthorizedException('로그인에 실패했습니다.');
        }
        const accessToken = await this.authService.login(user);

        // Access Token을 HttpOnly 쿠키로 설정
        res.cookie('accessToken', accessToken, {
            httpOnly: true, // JavaScript에서 접근 불가능
            secure: process.env.NODE_ENV === 'production', // HTTPS 사용 시에만 전송 (프로덕션 환경에서)
            sameSite: 'strict', // CSRF 공격 방지
            maxAge: 60 * 60 * 1000, // 쿠키의 만료 시간 (1시간)
        })
        
        return res.status(HttpStatus.OK).json({ message: '로그인에 성공하였습니다.' });
    }
    

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const existingUser = await this.usersService.findOne(createUserDto.loginId);
        if (existingUser) {
            throw new BadRequestException('이미 사용중인 회원아이디 입니다.');
        }
        try{
            this.authService.signUp(createUserDto)
            return res.status(HttpStatus.OK).json({ message: '회원 가입이 완료되었습니다.' });

        }catch(error){
            throw new BadRequestException('회원가입에 실패하였습니다.');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res() res: Response) {
        // Access Token 쿠키 삭제
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        
        return res.status(HttpStatus.OK).json({ message: '로그아웃에 성공하였습니다.' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Request() req) {
        const userId = req.user.id; 
        // console.log(userId);
        
        try {
            await this.usersService.deleteUser(userId);
            
            return { message: '회원 탈퇴가 성공적으로 처리되었습니다.' };
        } catch (error) {
            throw new HttpException('회원 탈퇴 처리 중 문제가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
