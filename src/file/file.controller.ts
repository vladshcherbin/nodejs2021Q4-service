import { Controller, Get, Param, Post, UploadedFile } from '@nestjs/common'
import FileService from './file.service'

@Controller('file')
export default class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  serveFile(@Param('filename') filename: string) {
    return this.fileService.serveFile(filename)
  }

  @Post()
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename
    }
  }
}
