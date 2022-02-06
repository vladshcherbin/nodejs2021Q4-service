import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ObjectionModule } from '@willsoto/nestjs-objection'
import BaseModel from './base.model'

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        Model: BaseModel,
        config: {
          client: 'pg',
          connection: config.get('DATABASE_URL')
        }
      })
    })
  ],
  exports: [ObjectionModule]
})
export default class DatabaseModule {}
