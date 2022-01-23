/* eslint-disable import/prefer-default-export */
import { object, string } from 'yup'
import { AuthenticationError } from '../../common/auth'
import { hashIsValid } from '../../common/hash'
import { generateToken } from '../../common/jwt'
import { validate } from '../../common/validation'
import User from '../users/model'

/**
 * Logs in the application.
 *
 * @param data - User credentials
 * @returns Authentication token
 */
export async function logIn(data: Pick<User, 'login' | 'password'>) {
  const schema = object({
    login: string().required(),
    password: string().required()
  })
  const { login, password } = await validate(schema, data)
  const user = await User.query().findOne({ login })

  if (!user) {
    throw new AuthenticationError('Such user doesn\'t exist')
  }

  if (!await hashIsValid(user.password, password)) {
    throw new AuthenticationError('Wrong password')
  }

  return {
    token: generateToken({ userId: user.id, login }, { expiresIn: '1h' })
  }
}
