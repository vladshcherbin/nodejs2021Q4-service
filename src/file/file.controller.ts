import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import FileService from './file.service'

@Controller('file')
export default class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  serveFile(@Param('filename') filename: string) {
    return this.fileService.serveFile(filename)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename
    }
  }
}
