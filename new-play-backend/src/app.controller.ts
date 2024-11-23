import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { RoleTypes } from './common/enums/user.enum';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './common/guards/role.guard';
import { Roles } from './common/decorators/roles.decorator';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleTypes.User)
  @Get('protected')
  protected(): string {
    return this.appService.getHello();
  }
}


