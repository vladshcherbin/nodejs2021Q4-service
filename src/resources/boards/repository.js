import Board from './model'

export function findAll() {
  return Board.query()
}

export function findById(boardId) {
  return Board.query().findById(boardId).throwIfNotFound({ message: 'Board not found' })
}

export function create(data) {
  return Board.query().insert(data)
}

export function update(boardId, data) {
  return Board.query().updateAndFetchById(boardId, data).throwIfNotFound({ message: 'Board not found' })
}

export async function del(boardId) {
  const deletedBoard = await Board.query().deleteById(boardId).throwIfNotFound({ message: 'Board not found' })

  await Board.relatedQuery('tasks').for(boardId).delete()

  return deletedBoard
}
