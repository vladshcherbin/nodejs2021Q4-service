import { BaseModel } from '../../common/database'
import Task from '../tasks/model'

class User extends BaseModel {
  static tableName = 'users'

  static relationMappings = {
    tasks: {
      relation: BaseModel.HasManyRelation,
      modelClass: Task,
      join: {
        from: 'users.id',
        to: 'tasks.userId'
      }
    }
  }

  $formatJson(json) {
    const formattedJson = super.$formatJson(json)

    delete formattedJson.password

    return formattedJson
  }
}

export default User
