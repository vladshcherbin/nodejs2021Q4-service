import { STATUS_CODES } from 'http'
import jwt from 'jsonwebtoken'
import { Context, HttpError, Next } from 'koa'
import { NotFoundError } from 'objection'
import { AuthenticationError, AuthorizationError } from '../auth'
import { ValidationError } from '../validation'

/**
 * Creates error handler middleware.
 *
 * @returns Error handler middleware
 */
export default function errorHandler() {
  return async function errorHandlerMiddleware(context: Context, next: Next) {
    try {
      await next()
    } catch (error) {
      if (error instanceof AuthorizationError) {
        context.status = 401
        context.body = {
          message: error.message
        }
      } else if (error instanceof jwt.TokenExpiredError) {
        context.status = 401
        context.body = {
          message: 'Token expired'
        }
      } else if (error instanceof jwt.JsonWebTokenError) {
        context.status = 401
        context.body = {
          message: 'Invalid token'
        }
      } else if (error instanceof jwt.NotBeforeError) {
        context.status = 401
        context.body = {
          message: 'Token is not active'
        }
      } else if (error instanceof AuthenticationError) {
        context.status = 403
        context.body = {
          message: error.message
        }
      } else if (error instanceof NotFoundError) {
        context.status = 404
        context.body = {
          message: 'Requested item doesn\'t exist'
        }
      } else if (error instanceof ValidationError) {
        context.status = 400
        context.body = {
          message: error.message,
          ...(error.validationErrors && {
            validationErrors: error.validationErrors
          })
        }
      } else if (error instanceof HttpError) {
        context.status = error.statusCode || error.status
        context.body = {
          message: STATUS_CODES[context.status]
        }
      } else {
        context.status = 500
        context.body = {
          message: STATUS_CODES[context.status]
        }
      }

      context.app.emit('error', error, context)
    }
  }
}
