import { Module } from '@nestjs/common'
import FileController from './file.controller'
import FileService from './file.service'

@Module({
  controllers: [FileController],
  providers: [FileService]
})
export default class FileModule {}
