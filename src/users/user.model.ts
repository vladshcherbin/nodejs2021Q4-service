import { ModelOptions, Pojo, QueryContext } from 'objection'
import BaseModel from '../common/database/base.model'
import { hash } from '../common/hash'

export default class User extends BaseModel {
  id!: string

  name!: string

  login!: string

  password!: string

  static tableName = 'users'

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext)

    this.password &&= await hash(this.password)
  }

  async $beforeUpdate(options: ModelOptions, queryContext: QueryContext) {
    await super.$beforeUpdate(options, queryContext)

    this.password &&= await hash(this.password)
  }

  $formatJson(json: Pojo) {
    const formattedJson = super.$formatJson(json)

    delete formattedJson.password

    return formattedJson
  }
}
