import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { createInMemoryDatabase } from './common/database'
import errorHandler from './common/error-handler'
import logger from './common/logger'
import boardsRouter from './resources/boards/router'
import tasksRouter from './resources/tasks/router'
import usersRouter from './resources/users/router'

await createInMemoryDatabase()

const app = new Koa()

app
  .use(errorHandler())
  .use(bodyParser())
  .use(boardsRouter.routes())
  .use(tasksRouter.routes())
  .use(usersRouter.routes())
  .on('error', (error) => {
    logger.error(error)
  })
  .listen(process.env.PORT || 4000, () => {
    logger.info('Server is up and running')
  })