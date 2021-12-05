import { BaseModel } from '../../common/database'

class User extends BaseModel {
  static tableName = 'users'

  $formatJson(json) {
    const formattedJson = super.$formatJson(json)

    delete formattedJson.password

    return formattedJson
  }
}

export default User
