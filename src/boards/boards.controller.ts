import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common'
import JwtGuard from '../auth/guards/jwt.guard'
import BoardsService from './boards.service'
import CreateBoardDto from './dto/create-board.dto'
import UpdateBoardDto from './dto/update-board.dto'

@Controller('boards')
@UseGuards(JwtGuard)
export default class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll() {
    return this.boardsService.findAll()
  }

  @Get(':boardId')
  findOne(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.boardsService.findById(boardId).throwIfNotFound()
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto)
  }

  @Put(':boardId')
  update(@Param('boardId', new ParseUUIDPipe()) boardId: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(boardId, updateBoardDto).throwIfNotFound()
  }

  @Delete(':boardId')
  @HttpCode(204)
  async remove(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    await this.boardsService.remove(boardId).throwIfNotFound()
  }
}
