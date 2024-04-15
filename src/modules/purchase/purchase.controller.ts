import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreatePurchaseDto } from './dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createPurchase(@Body() body: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(body);
  }

  @UseGuards(AuthGuard)
  @Post('create-bulk')
  createBulkPurchase(@Body() body: any) {
    return this.purchaseService.createBulkPurchase(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  fetchAllPurchases() {
    return this.purchaseService.fetchAllPurchases();
  }

  @UseGuards(AuthGuard)
  @Get('download')
  downloadPurchases(@Query() {startDate, endDate}: any) {
    return this.purchaseService.downloadPurchases(startDate, endDate);
  }
}
