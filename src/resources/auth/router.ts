import Router from '@koa/router'
import * as Auth from './repository'

const router = new Router()

router.post('/login', async (context) => {
  context.body = await Auth.logIn(context.request.body)
})

export default router
