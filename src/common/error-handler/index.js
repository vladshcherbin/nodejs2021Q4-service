import { STATUS_CODES } from 'http'
import { NotFoundError } from 'objection'

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
