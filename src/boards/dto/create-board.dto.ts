import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator'
import BoardColumnDto from './board-column.dto'

export default class CreateBoardDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
    title!: string

  @Type(() => BoardColumnDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
    columns!: BoardColumnDto[]
}
