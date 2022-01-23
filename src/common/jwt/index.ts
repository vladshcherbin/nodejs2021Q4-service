import jwt from 'jsonwebtoken'

/**
 * Generates token.
 *
 * @param payload - Data to sign
 * @param options - Signing options
 * @returns Token
 */
export function generateToken(payload: object, options: jwt.SignOptions) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, options)
}

/**
 * Verify token.
 *
 * @param token - Token to verify
 * @returns Decoded data
 */
export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string)
}
