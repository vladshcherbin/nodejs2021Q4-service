import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import UsersModule from '../users/users.module'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import JwtStrategy from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      })
    }),
    PassportModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export default class AuthModule {}
