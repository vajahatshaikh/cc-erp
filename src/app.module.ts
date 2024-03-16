import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, PrismaModule } from './modules';
import { AuthHelper } from './modules/auth/auth.helper';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthHelper],
})
export class AppModule {}
