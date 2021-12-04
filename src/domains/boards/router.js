import Router from '@koa/router'
import * as board from './repository'

const router = new Router({ prefix: '/boards' })

router
  .get('/', (context) => {
    context.body = board.findAll()
  })
  .get('/:id', (context) => {
    context.body = board.findById(context.params.id)
  })
  .post('/', (context) => {
    const newBoard = board.create(context.request.body)

    context.status = 201
    context.body = newBoard
  })
  .put('/:id', (context) => {
    context.body = board.update(context.params.id, context.request.body)
  })
  .delete('/:id', (context) => {
    board.deleteById(context.params.id)

    context.status = 204
    context.body = null
  })

export default router
