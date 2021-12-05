import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import boardsRouter from './domains/boards/router'
import { createInMemoryDatabase } from './common/database'
import errorHandler from './common/error-handler'
import usersRouter from './resources/users/router'

await createInMemoryDatabase()

const app = new Koa()

app
  .use(errorHandler())
  .use(bodyParser())
  .use(boardsRouter.routes())
  .use(usersRouter.routes())
  .listen(process.env.PORT || 3000)
