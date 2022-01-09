import { Context, Next } from 'koa'
import logRequest from './request-logger'
import logResponse from './response-logger'

/**
 * Creates http logger middleware.
 *
 * @returns Http logger middleware
 */
export default function httpLogger() {
  return async function httpLoggerMiddleware(context: Context, next: Next) {
    logRequest(context)

    await next()

    logResponse(context)
  }
}
