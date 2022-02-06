import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import multipart from 'fastify-multipart'
import { Logger } from 'nestjs-pino'
import AppModule from './app.module'

async function setupApp(useFastify: boolean) {
  if (useFastify) {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      { bufferLogs: true }
    )

    app.register(multipart)

    return app
  }

  return NestFactory.create(AppModule, { bufferLogs: true })
}

async function bootstrap() {
  const configService = new ConfigService()
  const useFastify = configService.get('USE_FASTIFY') === 'true'
  const app = await setupApp(useFastify)
  const appConfigService = app.get(ConfigService)

  app.useLogger(app.get(Logger))
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))

  await app.listen(appConfigService.get('PORT', 4000))
}

bootstrap()
