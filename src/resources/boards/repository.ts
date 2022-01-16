import { array, number, object, string } from 'yup'
import { validate } from '../../common/validation'
import Board from './model'

/**
 * Fetches all boards.
 *
 * @returns List of boards
 */
export function findAll() {
  return Board.find()
}

/**
 * Fetches board by id.
 *
 * @param boardId - Board id
 * @returns Specified board
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when board is missing
 */
export function findById(boardId: Board['id']) {
  return Board.findOneOrFail(boardId)
}

/**
 * Creates a new board.
 *
 * @param data - Board data
 * @returns Created board
 */
export async function create(data: Partial<Board>) {
  const schema = object({
    title: string().required().min(2),
    columns: array(object({
      title: string().required().min(2),
      order: number().required().integer()
    })).required()
  })
  const validData: Partial<Board> = await validate(schema, data)
  const { id } = await Board.create(validData).save()

  return Board.findOne(id)
}

/**
 * Updates specified board.
 *
 * @param boardId - Board id
 * @param data - Updated board data
 * @returns Updated board
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when board is missing
 */
export async function update(boardId: Board['id'], data: Partial<Board>) {
  const schema = object({
    title: string().required().min(2),
    columns: array(object({
      title: string().required().min(2),
      order: number().required().integer()
    })).required()
  })
  const validData = await validate(schema, data)
  const board = await Board.findOneOrFail(boardId)

  board.title = validData.title || board.title
  board.columns = validData.columns || board.columns

  await board.save()

  return Board.findOne(boardId)
}

/**
 * Deletes specified board.
 *
 * @param boardId - Board id
 * @returns Deleted board
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when board is missing
 */
export async function del(boardId: Board['id']) {
  const board = await Board.findOneOrFail(boardId)

  await board.remove()

  return board
}
