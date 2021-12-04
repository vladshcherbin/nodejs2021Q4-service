import { NotFoundError } from '../../modules/errors'
import * as Board from './model'

export function findAll() {
  return Board.findAll()
}

export function findById(id) {
  const board = Board.findById(id)

  if (!board) {
    throw new NotFoundError('Board not found')
  }

  return board
}

export function create(data) {
  return Board.insert(data)
}

export function update(id, data) {
  const board = Board.findById(id)

  if (!board) {
    throw new NotFoundError('Board not found')
  }

  return Board.update(id, data)
}

export function deleteById(id) {
  const board = Board.findById(id)

  if (!board) {
    throw new NotFoundError('Board not found')
  }

  return Board.remove(id)
}
