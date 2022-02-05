import { Inject, Injectable } from '@nestjs/common'
import CreateUserDto from './dto/create-user.dto'
import UpdateUserDto from './dto/update-user.dto'
import User from './user.model'

@Injectable()
export default class UsersService {
  constructor(@Inject(User) private readonly userModel: typeof User) {}

  findAll() {
    return this.userModel.query()
  }

  findById(id: User['id']) {
    return this.userModel.query().findById(id)
  }

  create(createUserDto: CreateUserDto) {
    return this.userModel.query().insert(createUserDto).returning('*')
  }

  update(id: User['id'], updateUserDto: UpdateUserDto) {
    return this.userModel.query().findById(id).patch(updateUserDto).returning('*')
  }

  remove(id: User['id']) {
    return this.userModel.query().deleteById(id).returning('*')
  }
}
