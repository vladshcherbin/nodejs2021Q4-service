import { number, object, string } from 'yup'
import { validate } from '../../common/validation'
import Board from '../boards/model'
import Task from './model'

/**
 * Fetches all board tasks.
 *
 * @param boardId - Board id
 * @returns List of tasks
 */
export function findAll(boardId: Board['id']) {
  return Task.find({ where: { boardId } })
}

/**
 * Fetches board task by id.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @returns Specified task
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when task is missing
 */
export function findById(boardId: Board['id'], taskId: Task['id']) {
  return Task.findOneOrFail({ where: { id: taskId, boardId } })
}

/**
 * Creates a new board task.
 *
 * @param boardId - Board id
 * @param data - Task data
 * @returns Created task
 */
export async function create(boardId: Board['id'], data: Partial<Task>) {
  const schema = object({
    title: string().required().min(2),
    order: number().required().integer(),
    description: string().min(6),
    userId: string().nullable().uuid(),
    boardId: string().nullable().uuid(),
    columnId: string().nullable().uuid()
  })
  const validData: Partial<Task> = await validate(schema, data)
  const { id } = await Task.create({ ...validData, boardId }).save()

  return Task.findOne(id)
}

/**
 * Updates specified board task.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @param data - Updated task data
 * @returns Updated task
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when task is missing
 */
export async function update(boardId: Board['id'], taskId: Task['id'], data: Partial<Task>) {
  const schema = object({
    title: string().required().min(2),
    order: number().required().integer(),
    description: string().min(6),
    userId: string().nullable().uuid(),
    boardId: string().nullable().uuid(),
    columnId: string().nullable().uuid()
  })
  const validData = await validate(schema, data)
  const task = await Task.findOneOrFail({ where: { id: taskId, boardId } })

  task.title = validData.title || task.title
  task.order = validData.order || task.order
  task.description = validData.description || task.description
  task.userId = validData.userId || task.userId
  task.boardId = validData.boardId || task.boardId
  task.columnId = validData.columnId || task.columnId

  await task.save()

  return Task.findOne({ where: { id: taskId, boardId } })
}

/**
 * Deletes specified board task.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @returns Deleted task
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when task is missing
 */
export async function del(boardId: Board['id'], taskId: Task['id']) {
  const task = await Task.findOneOrFail({ where: { id: taskId, boardId } })

  await task.remove()

  return task
}
