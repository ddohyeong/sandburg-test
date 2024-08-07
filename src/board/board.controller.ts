import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create.dto';
import { Board } from './entity/board.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBoardDto } from './dto/update.dto';

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
}
