import { gray, white } from 'colorette'
import pinoPretty from 'pino-pretty'

/**
 * Creates pino pretty formatter.
 *
 * @returns Pino pretty transport
 */
export default function prettifier() {
  return pinoPretty({
    translateTime: 'dd-mm-yyyy HH:MM:ss',
    ignore: 'method,path,status,type',
    messageFormat: (log, messageKey) => {
      const { method, path, status, type } = log
      const message = log[messageKey]
      const messageParts = []

      if (type) {
        messageParts.push(white(`(${type})`))
      }

      if (message === 'request') {
        messageParts.push('<--')
      }

      if (message === 'response') {
        messageParts.push('-->')
      }

      if (method) {
        messageParts.push(method)
      }

      if (path) {
        messageParts.push(path)
      }

      if (status) {
        messageParts.push(status)
      }

      if (message && message !== 'request' && message !== 'response') {
        messageParts.push(log[messageKey])
      }

      return gray(messageParts.join(' '))
    }
  })
}
