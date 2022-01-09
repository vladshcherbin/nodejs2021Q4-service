import { Context, Response } from 'koa'
import logger from './logger'

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
 * Logs http response.
 *
 * @param context - Koa context
 */
export default function logResponse(context: Context) {
  logger[responseLogLevel(context.status)]({
    method: context.method,
    path: context.path,
    status: context.status
  }, 'response')
}
