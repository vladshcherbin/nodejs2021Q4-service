import isObject from 'is-plain-obj'
import { AnySchema, ObjectSchema } from 'yup'

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
