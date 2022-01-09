import { Context } from 'koa'
import logRequest from './request-logger'

/**
 * Logs body parser error.
 *
 * @param error - Body parser error
 * @param context - Koa context
 */
export default function logBodyParserError(error: Error, context: Context) {
  logRequest(context)

  throw error
}
