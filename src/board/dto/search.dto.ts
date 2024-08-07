import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { BoardType } from "../entity/type.enum";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class SearchBoardDto {
    @ApiProperty({ description: 'title', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ description: 'loginId', required: false })
    @IsOptional()
    @IsString()
    loginId?: string;

    @ApiProperty({ description: 'type', required: false })
    @IsOptional()
    @IsEnum(BoardType, { message: '유효한 게시판 유형이어야 합니다.' })
    type?: BoardType;

    @ApiProperty({ description: 'page', required: false })
    @IsOptional()
    @Type(() => Number) // Transform the input to a number
    @IsInt({ message: '페이지 번호는 정수여야 합니다.' })
    @Min(1, { message: '페이지 번호는 최소 1이어야 합니다.' })
    page: number = 1;

    @ApiProperty({ description: 'limit', required: false })
    @IsOptional()
    @Type(() => Number) // Transform the input to a number
    @IsInt({ message: '항목 수는 정수여야 합니다.' })
    @Min(1, { message: '항목 수는 최소 1이어야 합니다.' })
    limit: number = 5;
}
