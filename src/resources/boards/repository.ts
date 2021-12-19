import { PartialModelObject } from 'objection'
import { array, number, object, string } from 'yup'
import { validate } from '../../common/validation'
import Board from './model'

export function findAll() {
  return Board.query()
}

export function findById(boardId: Board['id']) {
  return Board.query().findById(boardId).throwIfNotFound()
}

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

export async function del(boardId: Board['id']) {
  const deletedBoard = await Board.query().deleteById(boardId).throwIfNotFound()

  await Board.relatedQuery('tasks').for(boardId).delete()

  return deletedBoard
}
