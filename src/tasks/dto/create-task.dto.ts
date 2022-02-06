import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator'

export default class CreateTaskDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
    title!: string

  @IsInt()
  @IsNotEmpty()
  @IsNumber()
    order!: number

  @MinLength(6)
  @IsString()
  @IsOptional()
    description?: string

  @IsUUID(4)
  @IsOptional()
  @IsString()
    userId?: string

  @IsUUID(4)
  @IsOptional()
  @IsString()
    columnId?: string
}
