import { Module } from '@nestjs/common'
import { ObjectionModule } from '@willsoto/nestjs-objection'
import Board from './board.model'
import BoardsController from './boards.controller'
import BoardsService from './boards.service'

@Module({
  imports: [ObjectionModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export default class BoardsModule {}
