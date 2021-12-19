import { PartialModelObject } from 'objection'
import { number, object, string } from 'yup'
import { validate } from '../../common/validation'
import Board from '../boards/model'
import Task from './model'

export function findAll(boardId: Task['id']) {
  return Task.query().where('boardId', boardId)
}

export function findById(boardId: Board['id'], taskId: Task['id']) {
  return Task.query().findOne({ id: taskId, boardId }).throwIfNotFound()
}

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

export function del(boardId: Board['id'], taskId: Task['id']) {
  return Task.query().findOne({ id: taskId, boardId }).delete().throwIfNotFound()
}
