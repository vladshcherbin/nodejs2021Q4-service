import typeorm from 'typeorm'
import Board from '../../resources/boards/model'
import Task from '../../resources/tasks/model'
import User from '../../resources/users/model'

/**
 * Connects to postgres database.
 */
export default async function connectDatabase() {
  await typeorm.createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Board, Task, User]
  })
}
