import typeorm from 'typeorm'
import Board from '../boards/model'
import User from '../users/model'

/**
 * Task database model.
 */
@typeorm.Entity('tasks')
class Task extends typeorm.BaseEntity {
  @typeorm.PrimaryGeneratedColumn('uuid')
    id!: string

  @typeorm.Column()
    title!: string

  @typeorm.Column({ nullable: true })
    order?: number

  @typeorm.Column({ nullable: true })
    description?: string

  @typeorm.Column('uuid', { nullable: true })
    userId?: string

  @typeorm.Column('uuid', { nullable: true })
    boardId?: string

  @typeorm.Column('uuid', { nullable: true })
    columnId?: string

  @typeorm.ManyToOne(() => Board, (board) => board.id)
    board?: Board

  @typeorm.ManyToOne(() => User, (user) => user.id)
    user?: User
}

export default Task
