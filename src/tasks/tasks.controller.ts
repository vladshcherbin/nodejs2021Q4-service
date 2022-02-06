import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import CreateTaskDto from './dto/create-task.dto'
import UpdateTaskDto from './dto/update-task.dto'
import TasksService from './tasks.service'

@Controller('boards/:boardId/tasks')
export default class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.tasksService.findAll(boardId)
  }

  @Get(':taskId')
  findOne(
  @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string
  ) {
    return this.tasksService.findById(taskId, boardId).throwIfNotFound()
  }

  @Post()
  create(
  @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.tasksService.create(boardId, createTaskDto)
  }

  @Put(':taskId')
  update(
  @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(taskId, boardId, updateTaskDto).throwIfNotFound()
  }

  @Delete(':taskId')
  @HttpCode(204)
  remove(
  @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string
  ) {
    return this.tasksService.remove(taskId, boardId).throwIfNotFound()
  }
}
