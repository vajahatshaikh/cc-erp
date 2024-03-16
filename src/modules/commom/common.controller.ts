import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommonService } from './common.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @UseGuards(AuthGuard)
  @Get('suppliers/dropdown')
  fetchSuppliers() {
    return this.commonService.fetchSuppliers();
  }

  @UseGuards(AuthGuard)
  @Get('purchase-items/dropdown')
  fetchPurchaseItems() {
    return this.commonService.fetchPurchaseItems();
  }
}
