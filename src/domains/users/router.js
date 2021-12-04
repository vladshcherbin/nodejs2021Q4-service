import Router from '@koa/router'
import * as user from './repository'

const router = new Router({ prefix: '/users' })

router
  .get('/', (context) => {
    context.body = user.findAll()
  })
  .get('/:id', (context) => {
    context.body = user.findById(context.params.id)
  })
  .post('/', (context) => {
    const newUser = user.create(context.request.body)

    context.status = 201
    context.body = newUser
  })
  .put('/:id', (context) => {
    context.body = user.update(context.params.id, context.request.body)
  })
  .delete('/:id', (context) => {
    user.deleteById(context.params.id)

    context.status = 204
    context.body = null
  })

export default router
