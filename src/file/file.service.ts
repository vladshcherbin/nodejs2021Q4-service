import { createReadStream } from 'fs'
import { join } from 'path'
import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common'
import fs from 'fs-extra'

@Injectable()
export default class FileService {
  async serveFile(filename: string) {
    const filePath = join(process.cwd(), `uploads/${filename}`)
    const fileExists = await fs.pathExists(filePath)

    if (!fileExists) {
      throw new NotFoundException('File doesn\'t exist')
    }

    const file = createReadStream(filePath)

    return new StreamableFile(file)
  }
}
