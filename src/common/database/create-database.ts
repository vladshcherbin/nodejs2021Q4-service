import knex from 'knex'
import { Model } from 'objection'

/**
 * Creates in-memory database and its structure.
 */
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

  await connection.schema
    .createTable('boards', (table) => {
      table.uuid('id')
      table.string('title')
      table.jsonb('columns')
    })

  await connection.schema
    .createTable('tasks', (table) => {
      table.uuid('id')
      table.string('title')
      table.integer('order')
      table.string('description')
      table.uuid('userId')
      table.uuid('boardId')
      table.uuid('columnId')
    })
}
