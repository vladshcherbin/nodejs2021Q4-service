import { Controller, Get, Param, Post, UploadedFile, UseGuards } from '@nestjs/common'
import JwtGuard from '../auth/guards/jwt.guard'
import FileService from './file.service'

@Controller('file')
@UseGuards(JwtGuard)
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
