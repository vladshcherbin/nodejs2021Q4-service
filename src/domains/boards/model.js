import { randomUUID } from 'crypto'
import boards from '../../data/boards'

export function findAll() {
  return boards
}

export function findById(id) {
  return boards.find((board) => board.id === id)
}

export function insert(data) {
  const board = { id: randomUUID(), ...data }

  boards.push(board)

  return board
}

export function update(id, data) {
  const existingBoard = boards.find((board) => board.id === id)

  if (!existingBoard) {
    return null
  }

  const existingBoardIndex = boards.findIndex((board) => board.id === id)
  const updatedBoard = { id, ...data }

  boards.fill(updatedBoard, existingBoardIndex, existingBoardIndex + 1)

  return updatedBoard
}

export function remove(id) {
  const existingBoard = boards.find((board) => board.id === id)

  if (!existingBoard) {
    return null
  }

  const existingBoardIndex = boards.findIndex((board) => board.id === id)

  boards.splice(existingBoardIndex, 1)

  return existingBoard
}
