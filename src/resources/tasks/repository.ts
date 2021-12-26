import { PartialModelObject } from 'objection'
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
export function findAll(boardId: Task['id']) {
  return Task.query().where('boardId', boardId)
}

/**
 * Fetches board task by id.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @returns Specified task
 *
 * @throws {@link NotFoundError}
 * Thrown when task is missing
 */
export function findById(boardId: Board['id'], taskId: Task['id']) {
  return Task.query().findOne({ id: taskId, boardId }).throwIfNotFound()
}

/**
 * Creates a new board task.
 *
 * @param boardId - Board id
 * @param data - Task data
 * @returns Created task
 */
export async function create(boardId: Board['id'], data: PartialModelObject<Task>) {
  const schema = object({
    title: string().required().min(2),
    order: number().required().integer(),
    description: string().min(6),
    userId: string().nullable().uuid(),
    boardId: string().nullable().uuid(),
    columnId: string().nullable().uuid()
  })
  const validData = await validate(schema, data)

  return Task.query().insert({ ...validData, boardId })
}

/**
 * Updates specified board task.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @param data - Updated task data
 * @returns Updated task
 *
 * @throws {@link NotFoundError}
 * Thrown when task is missing
 */
export async function update(boardId: Board['id'], taskId: Task['id'], data: PartialModelObject<Task>) {
  const schema = object({
    title: string().required().min(2),
    order: number().required().integer(),
    description: string().min(6),
    userId: string().nullable().uuid(),
    boardId: string().nullable().uuid(),
    columnId: string().nullable().uuid()
  })
  const validData = await validate(schema, data)
  const task = await Task.query().findOne({ id: taskId, boardId }).throwIfNotFound()

  return task.$query().updateAndFetch(validData)
}

/**
 * Deletes specified board task.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @returns Deleted task
 *
 * @throws {@link NotFoundError}
 * Thrown when task is missing
 */
export async function del(boardId: Board['id'], taskId: Task['id']) {
  const task = await Task.query().findOne({ id: taskId, boardId }).throwIfNotFound()

  await task.$query().delete()

  return task
}
