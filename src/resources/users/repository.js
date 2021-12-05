import User from './model'

export function findAll() {
  return User.query()
}

export function findById(userId) {
  return User.query().findById(userId).throwIfNotFound({ message: 'User not found' })
}

export function create(data) {
  return User.query().insert(data)
}

export function update(userId, data) {
  return User.query().updateAndFetchById(userId, data).throwIfNotFound({ message: 'User not found' })
}

export function del(userId) {
  return User.query().deleteById(userId).throwIfNotFound({ message: 'User not found' })
}
