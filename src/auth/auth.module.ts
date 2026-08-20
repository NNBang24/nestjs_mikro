import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import { type StringValue } from 'ms';
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
        secret: configService.get('JWT_ACCESS_TOKEN') || '',
        signOptions: {
          expiresIn: (String(configService.get('JWT_ACCESS_EXPIRE')) ||
            3600) as StringValue,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
