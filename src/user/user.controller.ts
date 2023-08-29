import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator/user.decorator';
import { User } from '@prisma/client';
import { MyJwtGuard } from '../auth/guard/myjwt.guard';
@Controller('users')
export class UserController {
  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    // no protection !
    return user;
  }
}
