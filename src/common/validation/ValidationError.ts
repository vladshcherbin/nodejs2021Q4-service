/**
 * Error thrown on failed validation.
 */
class ValidationError extends Error {
  /**
   * An object of invalid fields with error messages.
   */
  validationErrors: Record<string, string>

  /**
   * Creates {@link ValidationError} error object.
   *
   * @param validationErrors - An object of invalid fields with error messages
   * @returns Instance of {@link ValidationError}
   */
  constructor(validationErrors: Record<string, string>) {
    super('Validation error')

    this.name = this.constructor.name
    this.validationErrors = validationErrors
  }
}

export default ValidationError
