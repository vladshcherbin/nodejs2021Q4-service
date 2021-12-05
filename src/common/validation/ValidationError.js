class ValidationError extends Error {
  constructor(validationErrors, ...parameters) {
    super('Validation error', ...parameters)

    this.name = this.constructor.name
    this.validationErrors = validationErrors
  }
}

export default ValidationError
