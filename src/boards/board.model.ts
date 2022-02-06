import BaseModel from '../common/database/base.model'

export default class Board extends BaseModel {
  id!: string

  title!: string

  columns!: {
    title: string
    order: number
  }[]

  static tableName = 'boards'

  static jsonAttributes = ['columns']
}
