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

export function del(boardId) {
  return Board.query().deleteById(boardId).throwIfNotFound({ message: 'Board not found' })
}
