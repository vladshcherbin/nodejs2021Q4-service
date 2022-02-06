import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hashIsValid } from '../common/hash'
import UsersService from '../users/users.service'
import LoginDto from './dto/login.dto'

@Injectable()
export default class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findByLogin(login)

    if (user && hashIsValid(user.password, password)) {
      return user
    }

    return null
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto
    const user = await this.usersService.findByLogin(login)

    if (!user) {
      throw new ForbiddenException('Such user doesn\'t exist')
    }

    if (!await hashIsValid(user.password, password)) {
      throw new ForbiddenException('Wrong password')
    }

    return {
      token: this.jwtService.sign({ userId: user.id, login })
    }
  }
}
