import { Module } from '@nestjs/common'
import { ObjectionModule } from '@willsoto/nestjs-objection'
import BaseModel from './base.model'

@Module({
  imports: [
    ObjectionModule.register({
      Model: BaseModel,
      config: {
        client: 'pg',
        connection: process.env.DATABASE_URL
      }
    })
  ],
  exports: [ObjectionModule]
})
export default class DatabaseModule {}
