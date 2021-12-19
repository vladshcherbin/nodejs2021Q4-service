import { ValidationError } from 'yup'

/**
 * Formats Yup validation error into an object of invalid fields with error messages.
 *
 * @param error - Yup validation error
 * @returns - Object containing invalid fields with error messages
 */
export default function formatYupError(error: ValidationError) {
  const errors: Record<string, string> = {}

  error.inner.forEach(({ message, path }) => {
    const field = path || '_'

    errors[field] ||= message
  })

  return errors
}
