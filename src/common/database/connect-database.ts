import knex from 'knex'
import { Model } from 'objection'

/**
 * Creates database connection and connects models.
 *
 * @returns Database connection
 */
export default function connectDatabase() {
  const knexConnection = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
  })

  Model.knex(knexConnection)

  return knexConnection
}
