import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import usersRouter from './domains/users/router'

const app = new Koa()

app
  .use(bodyParser())
  .use(usersRouter.routes())
  .listen(process.env.PORT || 3000)
