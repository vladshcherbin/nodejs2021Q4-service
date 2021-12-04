import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import boardsRouter from './domains/boards/router'
import usersRouter from './domains/users/router'

const app = new Koa()

app
  .use(bodyParser())
  .use(boardsRouter.routes())
  .use(usersRouter.routes())
  .listen(process.env.PORT || 3000)
