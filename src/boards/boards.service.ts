import { Inject, Injectable } from '@nestjs/common'
import Board from './board.model'
import CreateBoardDto from './dto/create-board.dto'
import UpdateBoardDto from './dto/update-board.dto'

@Injectable()
export default class BoardsService {
  constructor(@Inject(Board) private readonly boardModel: typeof Board) {}

  findAll() {
    return this.boardModel.query()
  }

  findById(id: Board['id']) {
    return this.boardModel.query().findById(id)
  }

  create(createBoardDto: CreateBoardDto) {
    return this.boardModel.query().insert(createBoardDto).returning('*')
  }

  update(id: Board['id'], updateBoardDto: UpdateBoardDto) {
    return this.boardModel.query().findById(id).patch(updateBoardDto).returning('*')
  }

  remove(id: Board['id']) {
    return this.boardModel.query().deleteById(id).returning('*')
  }
}
