import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { createInMemoryDatabase } from './common/database'
import errorHandler from './common/error-handler'
import boardsRouter from './resources/boards/router'
import usersRouter from './resources/users/router'

await createInMemoryDatabase()

const app = new Koa()

app
  .use(errorHandler())
  .use(bodyParser())
  .use(boardsRouter.routes())
  .use(usersRouter.routes())
  .on('error', (error) => {
    console.log('Server error', error)
  })
  .listen(process.env.PORT || 3000)
