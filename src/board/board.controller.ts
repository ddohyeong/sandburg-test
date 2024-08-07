import { Body, Controller, Delete, ForbiddenException, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create.dto';
import { Board } from './entity/board.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBoardDto } from './dto/update.dto';
import { DeleteBoardDto } from './dto/delete.dto';

@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService : BoardService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBoard(@Body() createBoardDto: CreateBoardDto, @Request() req) : Promise<Board>{
        const user = req.user;
        return this.boardService.createBoard(createBoardDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateBoard(@Body() updateBoardDto : UpdateBoardDto, @Request() req) :Promise<Board>{
        const user = req.user;
        return this.boardService.updateBoard(updateBoardDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteBoard(@Body() deleteBoardDto : DeleteBoardDto, @Request() req) :Promise<{ message: string }>{
        const user = req.user;
        
        await this.boardService.deleteBoard(deleteBoardDto, user);
        return { message: '선택한 게시글이 삭제되었습니다.' };
    }
}
