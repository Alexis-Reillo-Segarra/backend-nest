import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, RoleProtected, Auth } from './decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto)
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testinPrivateRoute(
    // @Req() request: Express.Request
    @GetUser() user: User,
    @GetUser('fullName') userName: string,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[]
  ) {
    return { ok: true, message: "Yes this is a private route", user: user, userName, userEmail, rawHeaders }
  }

  @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected(ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testinPrivateRoute2(
    // @Req() request: Express.Request
    @GetUser() user: User,
  ) {
    return { ok: true, message: "Yes this is a private route", user: user }
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  testinPrivateRoute3(
    // @Req() request: Express.Request
    @GetUser() user: User,
  ) {
    return { ok: true, message: "Yes this is a private route", user: user }
  }
}
