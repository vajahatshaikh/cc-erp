import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthHelper } from 'src/common/helpers/auth.helper';
import { UserRepository } from './repository/user-repository';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, UserRepository],
})
export class AuthModule {}
