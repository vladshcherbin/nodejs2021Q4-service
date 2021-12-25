/**
 * Error thrown when query result is empty.
 */
class NotFoundError extends Error {
  /**
   * Creates {@link NotFoundError} error object.
   *
   * @param message - A human-readable description of the error
   * @returns Instance of {@link NotFoundError}
   */
  constructor(message?: string) {
    super(message || 'Requested item doesn\'t exist')

    this.name = this.constructor.name
  }
}

export default NotFoundError
