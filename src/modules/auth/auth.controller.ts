import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerive: AuthService) {}

  @Post('admin/login')
  adminLogin(@Body() body: AdminLoginDto) {
    return this.authSerive.adminLogin(body);
  }
}
