/**
 * Error thrown on failed authentication.
 */
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)

    this.name = this.constructor.name
  }
}

export default AuthenticationError
