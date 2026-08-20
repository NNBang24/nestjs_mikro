import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SanitizedUser } from './users/types/user.type';
import { LocalAuthGuard } from './auth/local-auth.guard';

interface AuthenticatedRequest extends Request {
  user: SanitizedUser;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
