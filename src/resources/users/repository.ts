import { object, string } from 'yup'
import { validate } from '../../common/validation'
import User from './model'

/**
 * Fetches all users.
 *
 * @returns List of users
 */
export function findAll() {
  return User.find()
}

/**
 * Fetches user by id.
 *
 * @param userId - User id
 * @returns Specified user
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when user is missing
 */
export function findById(userId: User['id']) {
  return User.findOneOrFail(userId)
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
    login: string().min(4),
    password: string().min(8)
  })
  const validData: Partial<User> = await validate(schema, data)
  const { id } = await User.create(validData).save()

  return User.findOne(id)
}

/**
 * Updates specified user.
 *
 * @param userId - User id
 * @param data - Updated user data
 * @returns Updated user
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when user is missing
 */
export async function update(userId: User['id'], data: Partial<User>) {
  const schema = object({
    name: string().required().min(2),
    login: string().min(4),
    password: string().min(8)
  })
  const validData = await validate(schema, data)
  const user = await User.findOneOrFail(userId)

  user.name = validData.name || user.name
  user.login = validData.login || user.login
  user.password = validData.password || user.password

  await user.save()

  return User.findOne(userId)
}

/**
 * Deletes specified user.
 *
 * @param userId - User id
 * @returns Deleted user
 *
 * @throws {@link typeorm#EntityNotFoundError}
 * Thrown when user is missing
 */
export async function del(userId: User['id']) {
  const user = await User.findOneOrFail(userId)

  await user.remove()

  return user
}
