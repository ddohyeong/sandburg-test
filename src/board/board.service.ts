import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { In, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create.dto';
import { UserRole } from 'src/users/entity/role.enum';
import { BoardType } from './entity/type.enum';
import { User } from 'src/users/entity/user.entity';
import { UpdateBoardDto } from './dto/update.dto';
import { DeleteBoardDto } from './dto/delete.dto';

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

    async updateBoard(updateBoardDto: UpdateBoardDto, user:User) : Promise<Board>{
        // 일반 사용자가 운영 및 공지 게시판으로 수정할 수 없도록 제한
        if (user.role === UserRole.USER &&
            (updateBoardDto.type === BoardType.ADMIN || updateBoardDto.type === BoardType.NOTICE)
        ) {
            throw new ForbiddenException('운영 및 공지 게시판은 일반유저는 사용할 수 없습니다.');
        }
        
        const board = await this.findBoardById(updateBoardDto.boardId)

        if (!board){
            throw new NotFoundException('존재하지 않는 게시글입니다.');
        }

        if(board.userId !== user.id){
            throw new ForbiddenException('해당 게시글을 수정할 권한이 없습니다');
        }

        board.title = updateBoardDto.title
        board.content = updateBoardDto.content
        board.type = updateBoardDto.type

        return this.boardRepository.save(board);

    }

    async deleteBoard(deleteBoardDto: DeleteBoardDto, user:User) : Promise<void>{
        const boards = await this.boardRepository.findBy({ id: In(deleteBoardDto.boardIds) })

        // 관리자가 아닌 경우, 권한 체크
        if (user.role !== UserRole.ADMIN) {
            // 유저 ID와 게시글의 userId가 다르면 예외 발생
            const unauthorizedBoards = boards.filter(board => board.userId !== user.id);
            if (unauthorizedBoards.length > 0) {
                throw new ForbiddenException('권한이 없는 게시글이 포함되어 있습니다.');
            }
        }
        
        // 게시글 삭제
        const result = await this.boardRepository.delete(deleteBoardDto.boardIds);
    }
    

    // 게시글 조회
    private async findBoardById(id: number): Promise<Board> {
        const board = await this.boardRepository.findOne({ where: { id } });
        if (!board) {
            throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
        }
        return board;
    }
}
