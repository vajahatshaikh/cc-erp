import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, CommonModule, PrismaModule } from './modules';
import { AuthHelper } from './modules/auth/auth.helper';

@Module({
  imports: [PrismaModule, AuthModule, CommonModule],
  controllers: [AppController],
  providers: [AppService, AuthHelper],
})
export class AppModule {}
