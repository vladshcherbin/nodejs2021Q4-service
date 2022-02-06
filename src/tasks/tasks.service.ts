import { Inject, Injectable } from '@nestjs/common'
import Board from '../boards/board.model'
import CreateTaskDto from './dto/create-task.dto'
import UpdateTaskDto from './dto/update-task.dto'
import Task from './task.model'

@Injectable()
export default class TasksService {
  constructor(@Inject(Task) private readonly taskModel: typeof Task) {}

  findAll(boardId: Board['id']) {
    return this.taskModel.query().where({ board_id: boardId })
  }

  findById(taskId: Task['id'], boardId: Board['id']) {
    return this.taskModel.query().findOne({ id: taskId, board_id: boardId })
  }

  create(boardId: Board['id'], createTaskDto: CreateTaskDto) {
    return this.taskModel.query().insert({ ...createTaskDto, boardId }).returning('*')
  }

  update(taskId: Task['id'], boardId: Board['id'], updateTaskDto: UpdateTaskDto) {
    return this.taskModel.query()
      .findOne({ id: taskId, board_id: boardId })
      .patch(updateTaskDto)
      .returning('*')
  }

  remove(taskId: Task['id'], boardId: Board['id']) {
    return this.taskModel.query()
      .where({ id: taskId, board_id: boardId })
      .delete()
      .returning('*')
  }
}
