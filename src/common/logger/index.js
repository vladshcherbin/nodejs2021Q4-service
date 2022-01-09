import pino from 'pino'

export default pino({
  base: null,
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'info',
        options: {
          translateTime: true
        }
      },
      {
        target: 'pino/file',
        level: 'trace',
        options: {
          destination: 'logs/app.log',
          mkdir: true
        }
      }
    ]
  }
})
