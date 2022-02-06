import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import AppModule from './app.module'

async function bootstrap() {
  const configService = new ConfigService()
  const app = (configService.get('USE_FASTIFY') === 'true')
    ? await NestFactory.create(AppModule, new FastifyAdapter())
    : await NestFactory.create(AppModule)
  const appConfigService = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))

  await app.listen(appConfigService.get('PORT', 4000))
}

bootstrap()
