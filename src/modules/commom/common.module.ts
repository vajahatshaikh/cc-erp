import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { PurchaseItemRepository, SupplierRepository } from './repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommonController],
  providers: [CommonService, SupplierRepository, PurchaseItemRepository],
})
export class CommonModule {}
