import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SanitizedUser } from './users/types/user.type';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/customize';

interface AuthenticatedRequest extends Request {
  user: SanitizedUser;
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('Profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
