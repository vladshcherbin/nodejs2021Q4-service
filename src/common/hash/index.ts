import bcrypt from 'bcrypt'

/**
 * Encrypts data.
 *
 * @param data - Raw data
 * @returns Encrypted data
 */
export function hash(data: string) {
  return bcrypt.hash(data, 12)
}

/**
 * Validates raw data againts encrypted.
 *
 * @param encryptedData - Encrypted data
 * @param data - Raw data
 * @returns Comparison result
 */
export function hashIsValid(encryptedData: string, data: string) {
  return bcrypt.compare(data, encryptedData)
}
