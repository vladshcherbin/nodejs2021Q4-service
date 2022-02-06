import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import AuthService from './auth.service'
import LoginDto from './dto/login.dto'

@Controller()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
