import { randomUUID } from 'crypto'
import { Model } from 'objection'
import NotFoundError from './NotFoundError'

class BaseModel extends Model {
  static createNotFoundError(_, message) {
    return new NotFoundError(typeof message === 'string' ? message : `${this.name} not found`)
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)

    this.id = randomUUID()
  }
}

export default BaseModel
