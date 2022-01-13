import { AnySchema, ValidationError as YupValidationError } from 'yup'
import ValidationError from './ValidationError'
import formatYupError from './format-yup-error'
import transformData from './transform-data'

/**
 * Validates data using Yup schema.
 *
 * @param schema - Yup schema
 * @param data - Raw data
 * @returns Valid data according to provided schema
 *
 * @throws {@link ValidationError}
 * Thrown if data is invalid or an error occurred during validation
 */
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
