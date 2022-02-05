import bcrypt from 'bcrypt'

export function hash(data: string) {
  return bcrypt.hash(data, 12)
}

export function hashIsValid(encryptedData: string, data: string) {
  return bcrypt.compare(data, encryptedData)
}
