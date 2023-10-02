import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { Role } from 'src/role/enums/role.enum';
import { Roles } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signinDto: SigninDto) {
    return this.authService.signIn(signinDto.username, signinDto.password);
  }
  @Roles(Role.User)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
