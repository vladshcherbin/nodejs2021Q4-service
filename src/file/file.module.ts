import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { FileInterceptor as ExpressFileInterceptor } from '@nestjs/platform-express'
import { FileInterceptor as FastifyFileInterceptor } from '@webundsoehne/nest-fastify-file-upload'
import FileController from './file.controller'
import FileService from './file.service'

const FileInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: process.env.USE_FASTIFY === 'true'
    ? FastifyFileInterceptor('file', { dest: 'uploads' })
    : ExpressFileInterceptor('file', { dest: 'uploads' })
}

@Module({
  controllers: [FileController],
  providers: [FileInterceptorProvider, FileService]
})
export default class FileModule {}
