import { IsInt, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'

export default class CreateBoardColumnDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
    title!: string

  @IsInt()
  @IsNotEmpty()
  @IsNumber()
    order!: number
}
