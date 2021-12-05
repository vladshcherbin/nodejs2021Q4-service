import { STATUS_CODES } from 'http'
import { NotFoundError } from 'objection'
import { ValidationError } from '../validation'

export default function errorHandler() {
  return async function errorHandlerMiddleware(context, next) {
    try {
      await next()
    } catch (error) {
      if (error instanceof NotFoundError) {
        context.status = error.statusCode
        context.body = {
          message: error.message
        }
      } else if (error instanceof ValidationError) {
        context.status = 400
        context.body = {
          message: error.message,
          validationErrors: error.validationErrors
        }
      } else {
        context.status = error.statusCode || error.status || 500
        context.body = {
          message: STATUS_CODES[context.status] || context.status
        }
      }

      context.app.emit('error', error, context)
    }
  }
}
