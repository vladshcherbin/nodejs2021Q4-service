/**
 * Error thrown when query result is empty.
 */
class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Requested item doesn\'t exist')

    this.name = this.constructor.name
  }
}

export default NotFoundError
