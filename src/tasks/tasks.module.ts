import { Module } from '@nestjs/common'
import { ObjectionModule } from '@willsoto/nestjs-objection'
import Task from './task.model'
import TasksController from './tasks.controller'
import TasksService from './tasks.service'

@Module({
  imports: [ObjectionModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService]
})
export default class TasksModule {}
