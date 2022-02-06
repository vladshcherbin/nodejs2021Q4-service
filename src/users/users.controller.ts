import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common'
import JwtGuard from '../auth/guards/jwt.guard'
import CreateUserDto from './dto/create-user.dto'
import UpdateUserDto from './dto/update-user.dto'
import UsersService from './users.service'

@Controller('users')
@UseGuards(JwtGuard)
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':userId')
  findOne(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.usersService.findById(userId).throwIfNotFound()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Put(':userId')
  update(@Param('userId', new ParseUUIDPipe()) userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto).throwIfNotFound()
  }

  @Delete(':userId')
  @HttpCode(204)
  remove(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.usersService.remove(userId).throwIfNotFound()
  }
}
