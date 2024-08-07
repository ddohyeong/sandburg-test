import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { CreateUserDto } from 'src/users/dto/create.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(loginId: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(loginId);

    // 사용자가 삭제되었는지 확인
    if (!user || user.deleted) {
      throw new UnauthorizedException('사용자가 존재하지 않거나 비활성화된 계정입니다.');
    }

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { loginId: user.loginId, sub: user.id, role: user.role };

    await this.usersService.updateLoginDate(user.id);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }
}
