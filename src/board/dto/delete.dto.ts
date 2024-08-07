import { ArrayNotEmpty, IsArray, IsInt } from "class-validator";

export class DeleteBoardDto {
    @IsArray()
    @ArrayNotEmpty({ message: '삭제할 게시글 ID 목록은 비어 있을 수 없습니다.' })
    @IsInt({ each: true, message: '모든 게시글 ID는 정수여야 합니다.' })
    boardIds: number[];
}
