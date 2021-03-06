import pino from 'pino'

export default pino({
  base: null,
  transport: {
    targets: [
      {
        target: '../prettifier',
        level: 'info',
        options: {}
      },
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
  },
  ...(process.env.LOG_LEVEL && {
    level: process.env.LOG_LEVEL
  })
})
