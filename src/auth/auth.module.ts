import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import UsersModule from '../users/users.module'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import JwtStrategy from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.register({ secret: 'ok', signOptions: { expiresIn: '1h' } }),
    PassportModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export default class AuthModule {}
