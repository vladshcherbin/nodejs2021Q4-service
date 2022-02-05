import { Module } from '@nestjs/common'
import DatabaseModule from './common/database/database.module'
import UsersModule from './users/users.module'

@Module({
  imports: [DatabaseModule, UsersModule]
})
export default class AppModule {}
