import { array, number, object, string } from 'yup'
import { validate } from '../../common/validation'
import Board from './model'

export function findAll() {
  return Board.query()
}

export function findById(boardId) {
  return Board.query().findById(boardId).throwIfNotFound({ message: 'Board not found' })
}

export async function create(data) {
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

export async function update(boardId, data) {
  const schema = object({
    title: string().required().min(2),
    columns: array(object({
      title: string().required().min(2),
      order: number().required().integer()
    })).required()
  })
  const validData = await validate(schema, data)

  return Board.query().updateAndFetchById(boardId, validData).throwIfNotFound({ message: 'Board not found' })
}

export async function del(boardId) {
  const deletedBoard = await Board.query().deleteById(boardId).throwIfNotFound({ message: 'Board not found' })

  await Board.relatedQuery('tasks').for(boardId).delete()

  return deletedBoard
}
