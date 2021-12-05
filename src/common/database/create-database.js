import knex from 'knex'
import { Model } from 'objection'

export default async function createInMemoryDatabase() {
  const connection = knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: ':memory:'
  })

  Model.knex(connection)

  await connection.schema
    .createTable('users', (table) => {
      table.uuid('id')
      table.string('name')
      table.string('login')
      table.string('password')
    })
}
