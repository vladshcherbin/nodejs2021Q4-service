class NotFoundError extends Error {
  constructor(message = 'Item not found') {
    super(message)

    this.name = this.constructor.name
    this.message = message
  }
}

export default NotFoundError
