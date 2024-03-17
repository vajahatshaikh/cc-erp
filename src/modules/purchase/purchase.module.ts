import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { MarketFeeRepository, PurchaseRepository } from './repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, PurchaseRepository, MarketFeeRepository],
})
export class PurchaseModule {}
