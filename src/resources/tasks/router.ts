import Router from '@koa/router'
import * as Task from './repository'

const router = new Router({ prefix: '/boards/:boardId/tasks' })

router
  .get('/', async (context) => {
    context.body = await Task.findAll(context.params.boardId)
  })
  .get('/:taskId', async (context) => {
    context.body = await Task.findById(context.params.boardId, context.params.taskId)
  })
  .post('/', async (context) => {
    const newTask = await Task.create(context.params.boardId, context.request.body)

    context.status = 201
    context.body = newTask
  })
  .put('/:taskId', async (context) => {
    const { params, request } = context

    context.body = await Task.update(params.boardId, params.taskId, request.body)
  })
  .delete('/:taskId', async (context) => {
    await Task.del(context.params.boardId, context.params.taskId)

    context.status = 204
    context.body = null
  })

export default router
