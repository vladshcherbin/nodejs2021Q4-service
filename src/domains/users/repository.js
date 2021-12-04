import { NotFoundError } from '../../modules/errors'
import * as User from './model'

export function findAll() {
  return User.findAll()
}

export function findById(id) {
  const user = User.findById(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return user
}

export function create(data) {
  return User.insert(data)
}

export function update(id, data) {
  const user = User.findById(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return User.update(id, data)
}

export function deleteById(id) {
  const user = User.findById(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  return User.remove(id)
}
