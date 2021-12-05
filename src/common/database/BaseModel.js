import { randomUUID } from 'crypto'
import { Model } from 'objection'

class BaseModel extends Model {
  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)

    this.id = randomUUID()
  }
}

export default BaseModel
