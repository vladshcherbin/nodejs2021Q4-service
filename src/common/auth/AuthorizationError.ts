/**
 * Error thrown on failed authorization.
 */
class AuthorizationError extends Error {
  constructor(message: string) {
    super(message)

    this.name = this.constructor.name
  }
}

export default AuthorizationError
