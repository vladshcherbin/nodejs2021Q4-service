import { randomUUID } from 'crypto'
import users from '../../data/users'

function omitSensitiveFields(user) {
  if (!user) {
    return user
  }

  const { password, ...restUser } = user

  return restUser
}

export function findAll() {
  return users.map(omitSensitiveFields)
}

export function findById(id) {
  return omitSensitiveFields(users.find((user) => user.id === id))
}

export function insert(data) {
  const user = { id: randomUUID(), ...data }

  users.push(user)

  return omitSensitiveFields(user)
}

export function update(id, data) {
  const existingUser = users.find((user) => user.id === id)

  if (!existingUser) {
    return null
  }

  const existingUserIndex = users.findIndex((user) => user.id === id)
  const updatedUser = { id, ...data }

  users.fill(updatedUser, existingUserIndex, existingUserIndex + 1)

  return omitSensitiveFields(updatedUser)
}

export function remove(id) {
  const existingUser = users.find((user) => user.id === id)

  if (!existingUser) {
    return null
  }

  const existingUserIndex = users.findIndex((user) => user.id === id)

  users.splice(existingUserIndex, 1)

  return omitSensitiveFields(existingUser)
}
