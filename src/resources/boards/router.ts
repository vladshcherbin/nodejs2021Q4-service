import Router from '@koa/router'
import * as Board from './repository'

const router = new Router({ prefix: '/boards' })

router
  .get('/', async (context) => {
    context.body = await Board.findAll()
  })
  .get('/:boardId', async (context) => {
    context.body = await Board.findById(context.params.boardId)
  })
  .post('/', async (context) => {
    const newBoard = await Board.create(context.request.body)

    context.status = 201
    context.body = newBoard
  })
  .put('/:boardId', async (context) => {
    context.body = await Board.update(context.params.boardId, context.request.body)
  })
  .delete('/:boardId', async (context) => {
    await Board.del(context.params.boardId)

    context.status = 204
    context.body = null
  })

export default router
