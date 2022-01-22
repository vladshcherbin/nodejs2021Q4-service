import { Pojo } from 'objection'
import { BaseModel } from '../../common/database'

/**
 * User model.
 */
class User extends BaseModel {
  id!: string

  name!: string

  login?: string

  password?: string

  static tableName = 'users'

  $formatJson(json: Pojo) {
    const formattedJson = super.$formatJson(json)

    delete formattedJson.password

    return formattedJson
  }
}

export default User
