import { createReadStream } from 'fs'
import { join } from 'path'
import { Controller, Get, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('file')
export default class FileController {
  @Get(':filename')
  serveFile(@Param('filename') filename: string) {
    const file = createReadStream(join(process.cwd(), `uploads/${filename}`))

    return new StreamableFile(file)
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename
    }
  }
}
