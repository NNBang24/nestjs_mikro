import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SanitizedUser } from '../users/types/user.type';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // username / pass la 2 tham so thu vien passport no nem ve
  async validateUser(
    username: string,
    pass: string,
  ): Promise<SanitizedUser | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user?.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }
  login(user: SanitizedUser) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
