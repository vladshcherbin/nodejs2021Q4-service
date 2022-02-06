import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule as PinoLogger } from 'nestjs-pino'

@Module({
  imports: [
    PinoLogger.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get('LOG_LEVEL', 'info'),
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
          },
          serializers: {
            req(req) {
              req.body = req.raw.body

              return req
            }
          },
          customLogLevel: ({ statusCode }) => {
            if (statusCode >= 500) {
              return 'error'
            }

            if (statusCode >= 400) {
              return 'warn'
            }

            if (statusCode >= 300) {
              return 'silent'
            }

            return 'info'
          }
        }
      })
    })
  ]
})
export default class LoggerModule {}
