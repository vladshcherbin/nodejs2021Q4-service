class NotFoundError extends Error {
  constructor(message, ...parameters) {
    super(message || 'Requested item doesn\'t exist', ...parameters)

    this.name = this.constructor.name
  }
}

export default NotFoundError
