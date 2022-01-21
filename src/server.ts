import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { connectDatabase } from './common/database'
import errorHandler from './common/error-handler'
import { httpLogger, logBodyParserError } from './common/http-logger'
import logger from './common/logger'
import boardsRouter from './resources/boards/router'
import tasksRouter from './resources/tasks/router'
import usersRouter from './resources/users/router'

await connectDatabase()

const app = new Koa()

app
  .use(bodyParser({
    onerror: logBodyParserError
  }))
  .use(httpLogger())
  .use(errorHandler())
  .use(boardsRouter.routes())
  .use(tasksRouter.routes())
  .use(usersRouter.routes())
  .on('error', (error) => {
    logger.error(error)
  })
  .listen(process.env.PORT || 4000, () => {
    logger.info('Server is up and running')
  })

process
  .on('uncaughtException', (error) => {
    logger.fatal(error, 'uncaughtException')
    process.exit(1)
  })
  .on('unhandledRejection', (reason) => {
    logger.fatal(reason || 'unhandledRejection', 'unhandledRejection')
    process.exit(1)
  })
