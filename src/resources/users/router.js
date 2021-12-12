import Router from '@koa/router'
import * as User from './repository'

const router = new Router({ prefix: '/users' })

router
  .get('/', async (context) => {
    context.body = await User.findAll()
  })
  .get('/:userId', async (context) => {
    context.body = await User.findById(context.params.userId)
  })
  .post('/', async (context) => {
    const newUser = await User.create(context.request.body)

    context.status = 201
    context.body = newUser
  })
  .put('/:userId', async (context) => {
    context.body = await User.update(context.params.userId, context.request.body)
  })
  .delete('/:userId', async (context) => {
    await User.del(context.params.userId)

    context.status = 204
    context.body = null
  })

export default router
