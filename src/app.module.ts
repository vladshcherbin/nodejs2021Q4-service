import { Module } from '@nestjs/common'
import AuthModule from './auth/auth.module'
import BoardsModule from './boards/boards.module'
import DatabaseModule from './common/database/database.module'
import TasksModule from './tasks/tasks.module'
import UsersModule from './users/users.module'

@Module({
  imports: [AuthModule, BoardsModule, DatabaseModule, TasksModule, UsersModule]
})
export default class AppModule {}
