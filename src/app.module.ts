import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import AuthModule from './auth/auth.module'
import BoardsModule from './boards/boards.module'
import DatabaseModule from './common/database/database.module'
import FileModule from './file/file.module'
import TasksModule from './tasks/tasks.module'
import UsersModule from './users/users.module'

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DatabaseModule,
    FileModule,
    TasksModule,
    UsersModule
  ]
})
export default class AppModule {}
