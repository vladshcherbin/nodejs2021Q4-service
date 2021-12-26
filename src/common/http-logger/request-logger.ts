import { Context } from 'koa'
import logger from './logger'

/**
 * Logs http request.
 *
 * @param context - Koa context
 */
export default function logRequest(context: Context) {
  logger.info({
    method: context.method,
    path: context.path,
    query: context.query,
    body: context.request.body
  }, 'request')
}
