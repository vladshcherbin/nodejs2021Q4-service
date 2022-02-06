import { PartialType } from '@nestjs/mapped-types'
import CreateBoardDto from './create-board.dto'

export default class UpdateBoardDto extends PartialType(CreateBoardDto) {}
