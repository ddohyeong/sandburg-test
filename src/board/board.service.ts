import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create.dto';

import { UserRole } from 'src/users/entity/role.enum';
import { BoardType } from './entity/type.enum';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ){}

    async createBoard(createBoardDto: CreateBoardDto, user:User) : Promise<Board>{
        
        // 일반 사용자가 운영 및 공지 게시판을 생성할 수 없도록 제한
        if (user.role === UserRole.USER &&
            (createBoardDto.type === BoardType.ADMIN || createBoardDto.type === BoardType.NOTICE)
        ) {
            throw new ForbiddenException('운영 및 공지 게시판은 관리자만 생성할 수 있습니다.');
        }
        
        createBoardDto.userId = user.id;

        // 게시판 생성
        const board = this.boardRepository.create(createBoardDto);
        return this.boardRepository.save(board);
    }
}
