import { randomUUID } from 'crypto'
import { CreateNotFoundErrorArgs, Model, QueryContext } from 'objection'
import NotFoundError from './NotFoundError'

/**
 * Shared base model for other database models.
 */
class BaseModel extends Model {
  id!: string

  static createNotFoundError(_: QueryContext, args: CreateNotFoundErrorArgs) {
    return new NotFoundError(typeof args === 'string' ? args : `${this.name} not found`)
  }

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext)

    this.id = randomUUID()
  }
}

export default BaseModel
