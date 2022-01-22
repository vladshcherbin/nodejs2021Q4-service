import { BaseModel } from '../../common/database'

/**
 * Board model.
 */
class Board extends BaseModel {
  id!: string

  title!: string

  columns!: {
    title: string
    order: number
  }[]

  static tableName = 'boards'

  static jsonAttributes = ['columns']
}

export default Board
