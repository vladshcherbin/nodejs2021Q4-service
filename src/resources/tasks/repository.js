import Task from './model'

export function findAll(boardId) {
  return Task.query().where('boardId', boardId)
}

export function findById(boardId, taskId) {
  return Task.query().findOne({ id: taskId, boardId }).throwIfNotFound({ message: 'Task not found' })
}

export function create(boardId, data) {
  return Task.query().insert({ ...data, boardId })
}

export async function update(boardId, taskId, data) {
  const task = await Task.query().findOne({ id: taskId, boardId }).throwIfNotFound({ message: 'Task not found' })

  return task.$query().updateAndFetch(data)
}

export function del(boardId, taskId) {
  return Task.query().findOne({ id: taskId, boardId }).delete().throwIfNotFound({ message: 'Task not found' })
}
