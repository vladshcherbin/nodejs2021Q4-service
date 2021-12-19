import { PartialModelObject } from 'objection'
import { object, string } from 'yup'
import { validate } from '../../common/validation'
import Task from '../tasks/model'
import User from './model'

export function findAll() {
  return User.query()
}

export function findById(userId: User['id']) {
  return User.query().findById(userId).throwIfNotFound()
}

export async function create(data: PartialModelObject<User>) {
  const schema = object({
    name: string().required().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().insert(validData)
}

export async function update(userId: User['id'], data: PartialModelObject<User>) {
  const schema = object({
    name: string().required().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().updateAndFetchById(userId, validData).throwIfNotFound()
}

export async function del(userId: User['id']) {
  const deletedUser = await User.query().deleteById(userId).throwIfNotFound()

  await User.relatedQuery('tasks').for(userId).patch({ userId: null } as PartialModelObject<Task>)

  return deletedUser
}
