class ValidationError extends Error {
  validationErrors: Record<string, string>

  constructor(validationErrors: Record<string, string>) {
    super('Validation error')

    this.name = this.constructor.name
    this.validationErrors = validationErrors
  }
}

export default ValidationError
