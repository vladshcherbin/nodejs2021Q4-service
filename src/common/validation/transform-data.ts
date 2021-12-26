import isObject from 'is-plain-obj'
import { AnySchema, ObjectSchema } from 'yup'

/**
 * Transforms data. Intended to be used before validation.
 *
 * @remarks
 *
 * If data is an object and schema is an object schema:
 * - unspecified data keys in schema are removed
 * - string values are trimmed
 *
 * @param data - Raw data
 * @param schema - Yup schema
 * @returns Transformed data
 */
export default function transformData(data: unknown, schema: AnySchema) {
  if (isObject(data) && schema instanceof ObjectSchema) {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => Object.keys(schema.fields).includes(key))
        .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
    )
  }

  return data
}
