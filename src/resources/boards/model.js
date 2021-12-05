import { BaseModel } from '../../common/database'

class Board extends BaseModel {
  static tableName = 'boards'

  static jsonAttributes = ['columns']
}

export default Board
