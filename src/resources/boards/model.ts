import typeorm from 'typeorm'

/**
 * Board database model.
 */
@typeorm.Entity('boards')
class Board extends typeorm.BaseEntity {
  @typeorm.PrimaryGeneratedColumn('uuid')
    id!: string

  @typeorm.Column()
    title!: string

  @typeorm.Column('jsonb')
    columns!: {
    title: string
    order: number
  }[]
}

export default Board
