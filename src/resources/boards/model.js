import { BaseModel } from '../../common/database'
import Task from '../tasks/model'

class Board extends BaseModel {
  static tableName = 'boards'

  static jsonAttributes = ['columns']

  static relationMappings = {
    tasks: {
      relation: BaseModel.HasManyRelation,
      modelClass: Task,
      join: {
        from: 'boards.id',
        to: 'tasks.boardId'
      }
    }
  }
}

export default Board
