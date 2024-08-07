import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create.dto';
import { Board } from './entity/board.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
}
