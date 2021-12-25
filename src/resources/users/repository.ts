import { PartialModelObject } from 'objection'
import { object, string } from 'yup'
import { validate } from '../../common/validation'
import Task from '../tasks/model'
import User from './model'

/**
 * Fetches all users.
 *
 * @returns List of users
 */
export function findAll() {
  return User.query()
}

/**
 * Fetches user by id.
 *
 * @param userId - User id
 * @returns Specified user
 *
 * @throws {@link NotFoundError}
 * Thrown when user is missing
 */
export function findById(userId: User['id']) {
  return User.query().findById(userId).throwIfNotFound()
}

/**
 * Creates a new user.
 *
 * @param data - User details
 * @returns Created user
 */
export async function create(data: PartialModelObject<User>) {
  const schema = object({
    name: string().required().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().insert(validData)
}

/**
 * Updates specified user.
 *
 * @param userId - User id
 * @param data - Updated user details
 * @returns Updated user
 *
 * @throws {@link NotFoundError}
 * Thrown when user is missing
 */
export async function update(userId: User['id'], data: PartialModelObject<User>) {
  const schema = object({
    name: string().required().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().updateAndFetchById(userId, validData).throwIfNotFound()
}

/**
 * Deletes specified user.
 *
 * @param userId - User id
 * @returns Deleted user
 *
 * @throws {@link NotFoundError}
 * Thrown when user is missing
 */
export async function del(userId: User['id']) {
  const deletedUser = await User.query().deleteById(userId).throwIfNotFound()

  await User.relatedQuery('tasks').for(userId).patch({ userId: null } as PartialModelObject<Task>)

  return deletedUser
}
