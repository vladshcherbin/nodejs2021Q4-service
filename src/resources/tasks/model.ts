import { BaseModel } from '../../common/database'

/**
 * Task database model.
 */
class Task extends BaseModel {
  static tableName = 'tasks'
}

export default Task
