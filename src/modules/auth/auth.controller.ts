import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerive: AuthService) {}

  @Post('admin/login')
  adminLogin(@Body() body: any) {
    return this.authSerive.adminLogin(body);
  }

  @UseGuards(AuthGuard)
  @Post('update/profile')
  updateProfile(@Body() body: any, @Req() request: any) {
    return this.authSerive.updateProfile(request, body);
  }
}
