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
  return Task.query().where({ board_id: boardId })
}

/**
 * Fetches board task by id.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @returns Specified task
 *
 * @throws {@link objection#NotFoundError}
 * Thrown when task is missing
 */
export function findById(boardId: Board['id'], taskId: Task['id']) {
  return Task.query().findOne({ id: taskId, board_id: boardId }).throwIfNotFound()
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
    columnId: string().nullable().uuid()
  })
  const validData = await validate(schema, data)

  return Task.query().insert({ boardId, ...validData }).returning('*')
}

/**
 * Updates specified board task.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @param data - Updated task data
 * @returns Updated task
 *
 * @throws {@link objection#NotFoundError}
 * Thrown when task is missing
 */
export async function update(boardId: Board['id'], taskId: Task['id'], data: Partial<Task>) {
  const schema = object({
    title: string().min(2),
    order: number().integer(),
    description: string().min(6),
    userId: string().nullable().uuid(),
    columnId: string().nullable().uuid()
  })
  const validData = await validate(schema, data)

  return Task.query()
    .findOne({ id: taskId, board_id: boardId })
    .patch(validData)
    .returning('*')
    .throwIfNotFound()
}

/**
 * Deletes specified board task.
 *
 * @param boardId - Board id
 * @param taskId - Task id
 * @returns Deleted task
 *
 * @throws {@link objection#NotFoundError}
 * Thrown when task is missing
 */
export async function del(boardId: Board['id'], taskId: Task['id']) {
  return Task.query()
    .where({ id: taskId, board_id: boardId })
    .delete()
    .returning('*')
    .throwIfNotFound()
}
