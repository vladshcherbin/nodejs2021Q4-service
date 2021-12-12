import ValidationError from './ValidationError'

function processData(data, schema) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => Object.keys(schema.fields).includes(key))
      .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
  )
}

function formatYupError(error) {
  const errors = {}

  error.inner.forEach(({ message, path }) => {
    if (!errors[path]) {
      errors[path] = message
    }
  })

  return errors
}

export default async function validate(schema, data) {
  const processedData = processData(data, schema)

  try {
    return await schema.validate(processedData, { abortEarly: false, strict: true })
  } catch (error) {
    throw new ValidationError(formatYupError(error))
  }
}
