import { Model, snakeCaseMappers } from 'objection'

class BaseModel extends Model {
  static columnNameMappers = snakeCaseMappers()

  static useLimitInFirst = true
}

export default BaseModel
