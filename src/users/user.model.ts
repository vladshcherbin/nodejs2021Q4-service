import bcrypt from 'bcrypt'
import { ModelOptions, Pojo, QueryContext } from 'objection'
import BaseModel from '../common/database/base.model'

export default class User extends BaseModel {
  id!: string

  name!: string

  login!: string

  password!: string

  static tableName = 'users'

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext)

    this.password &&= await bcrypt.hash(this.password, 12)
  }

  async $beforeUpdate(options: ModelOptions, queryContext: QueryContext) {
    await super.$beforeUpdate(options, queryContext)

    this.password &&= await bcrypt.hash(this.password, 12)
  }

  $formatJson(json: Pojo) {
    const formattedJson = super.$formatJson(json)

    delete formattedJson.password

    return formattedJson
  }
}
