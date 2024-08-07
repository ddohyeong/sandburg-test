import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create.dto';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { loginId, password, email } = createUserDto;

    // 비밀번호 해시 처리
    const hashedPassword = await bycrypt.hash(password, 10);

    const user = new User();
    user.loginId = loginId
    user.password = hashedPassword
    user.email = email

    return this.usersRepository.save(user);
  }

  async findOne(loginId: string): Promise< User | undefined> {
    return this.usersRepository.findOne({ where: { loginId } });
  }

  async findOneById(id : number): Promise< User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateLoginDate(userId: number): Promise<void> {
    // 로그인 시각 업데이트
    await this.usersRepository.update(userId, { loginDate: new Date() });
  }

  async deleteUser(userId: number): Promise<void> {
    // 삭제 여부를 true로 설정하여 사용자를 비활성화
    await this.usersRepository.update(userId, { deleted: true });
  }
}
