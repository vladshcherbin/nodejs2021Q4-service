import BaseModel from '../common/database/base.model'

export default class Task extends BaseModel {
  id!: string

  boardId?: string

  columnId?: string

  userId?: string

  title!: string

  order?: number

  description?: string

  static tableName = 'tasks'
}
