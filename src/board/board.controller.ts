import { Body, Controller, Delete, Get, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create.dto';
import { Board } from './entity/board.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateBoardDto } from './dto/update.dto';
import { DeleteBoardDto } from './dto/delete.dto';
import { SearchBoardDto } from './dto/search.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('게시판 API')
@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService : BoardService
    ){}

    @ApiBearerAuth('Authorization')
    @ApiOperation({summary :'게시판 생성 API'})
    @ApiBody({type : CreateBoardDto})
    @UseGuards(JwtAuthGuard)
    @Post()
    async createBoard(@Body() createBoardDto: CreateBoardDto, @Request() req) : Promise<Board>{
        const user = req.user;
        return this.boardService.createBoard(createBoardDto, user);
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({summary :'게시판 수정 API'})
    @ApiBody({type : UpdateBoardDto})
    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateBoard(@Body() updateBoardDto : UpdateBoardDto, @Request() req) :Promise<Board>{
        const user = req.user;
        return this.boardService.updateBoard(updateBoardDto, user);
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({summary :'게시판 삭제 API'})
    @ApiBody({type : DeleteBoardDto})
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteBoard(@Body() deleteBoardDto : DeleteBoardDto, @Request() req) :Promise<{ message: string }>{
        const user = req.user;
        
        await this.boardService.deleteBoard(deleteBoardDto, user);
        return { message: '선택한 게시글이 삭제되었습니다.' };
    }

    @ApiOperation({summary :'게시판 조회 API'})
    @Get()
    async searchBoards(@Query() searchBoardDto: SearchBoardDto): Promise<{ boards: Board[]; total: number; page: number; limit: number }> {
        const { boards, total } = await this.boardService.searchBoards(searchBoardDto);
        const { page, limit } = searchBoardDto;
        return {
            boards,
            total,
            page,
            limit,
        };
    }    
}

