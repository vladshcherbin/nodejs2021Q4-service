import typeorm from 'typeorm'

/**
 * User database model.
 */
@typeorm.Entity('users')
class User extends typeorm.BaseEntity {
  @typeorm.PrimaryGeneratedColumn('uuid')
    id!: string

  @typeorm.Column()
    name!: string

  @typeorm.Column({ nullable: true })
    login?: string

  @typeorm.Column({ nullable: true, select: false })
    password?: string
}

export default User
