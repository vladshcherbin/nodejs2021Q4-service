import { ValidationError } from 'yup'

export default function formatYupError(error: ValidationError) {
  const errors: Record<string, string> = {}

  error.inner.forEach(({ message, path }) => {
    const field = path || '_'

    errors[field] ||= message
  })

  return errors
}
