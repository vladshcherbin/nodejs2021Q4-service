import { Pojo } from 'objection'
import { BaseModel } from '../../common/database'
import Task from '../tasks/model'

/**
 * User database model.
 */
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

  /**
   * Removes password from user external json.
   *
   * @param json - The JSON POJO in internal format
   * @returns The JSON POJO in external format
   */
  $formatJson(json: Pojo) {
    const formattedJson = super.$formatJson(json)

    delete formattedJson.password

    return formattedJson
  }
}

export default User
