import { Module } from '@nestjs/common'
import BoardsModule from './boards/boards.module'
import DatabaseModule from './common/database/database.module'
import TasksModule from './tasks/tasks.module'
import UsersModule from './users/users.module'

@Module({
  imports: [DatabaseModule, BoardsModule, TasksModule, UsersModule]
})
export default class AppModule {}
