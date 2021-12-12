import { object, string } from 'yup'
import { validate } from '../../common/validation'
import User from './model'

export function findAll() {
  return User.query()
}

export function findById(userId) {
  return User.query().findById(userId).throwIfNotFound()
}

export async function create(data) {
  const schema = object({
    name: string().required().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().insert(validData)
}

export async function update(userId, data) {
  const schema = object({
    name: string().required().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().updateAndFetchById(userId, validData).throwIfNotFound()
}

export async function del(userId) {
  const deletedUser = await User.query().deleteById(userId).throwIfNotFound()

  await User.relatedQuery('tasks').for(userId).patch({ userId: null })

  return deletedUser
}
