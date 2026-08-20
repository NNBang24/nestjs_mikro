import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
interface CustomConfigService {
  get(key: string): string | undefined;
}
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: CustomConfigService) => ({
        secret: configService.get('JWT_SECRET') || '',
        signOptions: {
          expiresIn: Number(configService.get('JWT_EXPIRE')) || 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
