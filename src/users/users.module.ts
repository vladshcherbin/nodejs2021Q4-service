import { Module } from '@nestjs/common'
import { ObjectionModule } from '@willsoto/nestjs-objection'
import User from './user.model'
import UsersController from './users.controller'
import UsersService from './users.service'

@Module({
  imports: [ObjectionModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export default class UsersModule {}
