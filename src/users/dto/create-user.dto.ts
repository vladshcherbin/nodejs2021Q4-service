import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export default class CreateUserDto {
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
    name!: string

  @MinLength(4)
  @IsString()
  @IsNotEmpty()
    login!: string

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
    password!: string
}
