import { Module } from '@nestjs/common'
import { LoggerModule as PinoLogger } from 'nestjs-pino'

@Module({
  imports: [
    PinoLogger.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: 'info',
              options: { destination: 1 }
            },
            {
              target: 'pino/file',
              level: 'trace',
              options: { destination: 'logs/app.log', mkdir: true }
            },
            {
              target: 'pino/file',
              level: 'error',
              options: { destination: 'logs/error.log', mkdir: true }
            }
          ]
        }
      }
    })
  ]
})
export default class LoggerModule {}
