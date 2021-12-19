import { AnySchema, ValidationError as YupValidationError } from 'yup'
import ValidationError from './ValidationError'
import formatYupError from './format-yup-error'
import transformData from './transform-data'

export default async function validate(schema: AnySchema, data: unknown) {
  const transformedData = transformData(data, schema)

  try {
    return await schema.validate(transformedData, { abortEarly: false, strict: true })
  } catch (error) {
    if (error instanceof YupValidationError) {
      throw new ValidationError(formatYupError(error))
    } else {
      throw new ValidationError({ _: 'Internal validation error' })
    }
  }
}
