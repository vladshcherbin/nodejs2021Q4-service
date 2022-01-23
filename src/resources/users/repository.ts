import { object, string } from 'yup'
import { validate } from '../../common/validation'
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
 * @throws {@link objection#NotFoundError}
 * Thrown when user is missing
 */
export function findById(userId: User['id']) {
  return User.query().findById(userId).throwIfNotFound()
}

/**
 * Creates a new user.
 *
 * @param data - User data
 * @returns Created user
 */
export async function create(data: Partial<User>) {
  const schema = object({
    name: string().required().min(2),
    login: string().required().min(4),
    password: string().required().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().insert(validData).returning('*')
}

/**
 * Updates specified user.
 *
 * @param userId - User id
 * @param data - Updated user data
 * @returns Updated user
 *
 * @throws {@link objection#NotFoundError}
 * Thrown when user is missing
 */
export async function update(userId: User['id'], data: Partial<User>) {
  const schema = object({
    name: string().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)

  return User.query().findById(userId).patch(validData).returning('*').throwIfNotFound()
}

/**
 * Deletes specified user.
 *
 * @param userId - User id
 * @returns Deleted user
 *
 * @throws {@link objection#NotFoundError}
 * Thrown when user is missing
 */
export async function del(userId: User['id']) {
  return User.query().deleteById(userId).returning('*').throwIfNotFound()
}
