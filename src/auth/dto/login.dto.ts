import { IsNotEmpty, IsString } from 'class-validator'

export default class LoginDto {
  @IsNotEmpty()
  @IsString()
    login!: string

  @IsNotEmpty()
  @IsString()
    password!: string
}
