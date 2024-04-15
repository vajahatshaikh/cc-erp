import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { MarketFeeRepository, PurchaseRepository } from './repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PdfHelper } from 'src/common/helpers/pdf-helper';

@Module({
  imports: [PrismaModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, PurchaseRepository, MarketFeeRepository, PdfHelper],
})
export class PurchaseModule {}
