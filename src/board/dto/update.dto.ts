import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { BoardType } from "../entity/type.enum";

export class UpdateBoardDto {
    @IsString()
    @IsNotEmpty({ message: '제목은 필수 항목입니다.' })
    @MinLength(1, { message: '제목은 최소 1자 이상이어야 합니다.' })
    title: string;
    
    @IsString()
    @IsNotEmpty({ message: '내용은 필수 항목입니다.' })
    @MinLength(1, { message: '내용은 최소 1자 이상이어야 합니다.' })
    content: string;
    
    @IsEnum(BoardType, { message: '유효한 게시판 유형이어야 합니다.' })
    type: BoardType;

    @IsNotEmpty()
    boardId : number;
}
