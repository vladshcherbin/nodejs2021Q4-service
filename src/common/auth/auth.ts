import { Context, Next } from 'koa'
import { verifyToken } from '../jwt'
import AuthorizationError from './AuthorizationError'

/**
 * Creates auth middleware.
 *
 * @returns Auth middleware
 */
export default function auth() {
  return async function authMiddleware(context: Context, next: Next) {
    const { authorization } = context.headers

    if (!authorization) {
      throw new AuthorizationError('Authorization header is missing')
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new AuthorizationError('Authorization value format is wrong')
    }

    const [, token] = authorization.split(' ')

    if (!token) {
      throw new AuthorizationError('Authorization token is missing')
    }

    verifyToken(token)

    await next()
  }
}
