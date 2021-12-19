import { randomUUID } from 'crypto'
import { CreateNotFoundErrorArgs, Model, QueryContext } from 'objection'
import NotFoundError from './NotFoundError'

/**
 * Shared base model for other database models.
 */
class BaseModel extends Model {
  /**
   * Unique uuid identifier.
   */
  id!: string

  /**
   * Creates custom error thrown by `throwIfNotFound` method.
   *
   * @param _ - The context object of query that produced the empty result
   * @param args - Data passed to the error class constructor
   * @returns Instance of custom {@link NotFoundError}
   */
  static createNotFoundError(_: QueryContext, args: CreateNotFoundErrorArgs) {
    return new NotFoundError(typeof args === 'string' ? args : `${this.name} not found`)
  }

  /**
   * Generates random uuid identifier before model is inserted into the database.
   *
   * @param queryContext - The context object of the insert query
   */
  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext)

    this.id = randomUUID()
  }
}

export default BaseModel
