import { Context, Next, Response } from 'koa'
import logger from '../logger'

const httpChildLogger = logger.child({ type: 'http' })

/**
 * Chooses log level according to response status.
 *
 * @param status - Response status
 * @returns Log level
 */
function responseLogLevel(status: Response['status']) {
  if (status >= 500) {
    return 'error'
  }

  if (status >= 400) {
    return 'warn'
  }

  if (status >= 300) {
    return 'silent'
  }

  return 'info'
}

/**
 * Creates http logger middleware.
 *
 * @returns Http logger middleware
 */
export default function httpLogger() {
  return async function httpLoggerMiddleware(context: Context, next: Next) {
    httpChildLogger.info({
      request: {
        method: context.method,
        path: context.path,
        query: context.query,
        body: context.request.body
      }
    })

    await next()

    httpChildLogger[responseLogLevel(context.status)]({
      response: {
        method: context.method,
        path: context.path,
        status: context.status
      }
    })
  }
}
