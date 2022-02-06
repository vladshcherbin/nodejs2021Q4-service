import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import UsersService from '../users/users.service'
import LoginDto from './dto/login.dto'

@Injectable()
export default class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto
    const user = await this.usersService.findByLogin(login)

    if (!user) {
      throw new ForbiddenException('Such user doesn\'t exist')
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new ForbiddenException('Wrong password')
    }

    return {
      token: this.jwtService.sign({ userId: user.id, login })
    }
  }
}
