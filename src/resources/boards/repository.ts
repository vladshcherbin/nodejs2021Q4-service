import { PartialModelObject } from 'objection'
import { array, number, object, string } from 'yup'
import { validate } from '../../common/validation'
import Board from './model'

/**
 * Fetches all boards.
 *
 * @returns List of boards
 */
export function findAll() {
  return Board.query()
}

/**
 * Fetches board by id.
 *
 * @param boardId - Board id
 * @returns Specified board
 *
 * @throws {@link NotFoundError}
 * Thrown when board is missing
 */
export function findById(boardId: Board['id']) {
  return Board.query().findById(boardId).throwIfNotFound()
}

/**
 * Creates a new board.
 *
 * @param data - Board details
 * @returns Created board
 */
export async function create(data: PartialModelObject<Board>) {
  const schema = object({
    title: string().required().min(2),
    columns: array(object({
      title: string().required().min(2),
      order: number().required().integer()
    })).required()
  })
  const validData = await validate(schema, data)

  return Board.query().insert(validData)
}

/**
 * Updates specified board.
 *
 * @param boardId - Board id
 * @param data - Updated board details
 * @returns Updated board
 *
 * @throws {@link NotFoundError}
 * Thrown when board is missing
 */
export async function update(boardId: Board['id'], data: PartialModelObject<Board>) {
  const schema = object({
    title: string().required().min(2),
    columns: array(object({
      title: string().required().min(2),
      order: number().required().integer()
    })).required()
  })
  const validData = await validate(schema, data)

  return Board.query().updateAndFetchById(boardId, validData).throwIfNotFound()
}

/**
 * Deletes specified board.
 *
 * @param boardId - Board id
 * @returns Deleted board
 *
 * @throws {@link NotFoundError}
 * Thrown when board is missing
 */
export async function del(boardId: Board['id']) {
  const board = await Board.query().findById(boardId).throwIfNotFound()

  await board.$query().delete()
  await Board.relatedQuery('tasks').for(boardId).delete()

  return board
}
