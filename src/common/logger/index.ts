import pino from 'pino'

export default pino({
  base: null,
  transport: {
    targets: [
      {
        target: 'pino/file',
        level: 'trace',
        options: {
          destination: 'logs/app.log',
          mkdir: true
        }
      },
      {
        target: 'pino/file',
        level: 'error',
        options: {
          destination: 'logs/error.log',
          mkdir: true
        }
      }
    ]
  }
})
