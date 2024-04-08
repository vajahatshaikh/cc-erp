import { Injectable } from '@nestjs/common';
import { MarketFeeRepository, PurchaseRepository } from './repository';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly marketFeeRepository: MarketFeeRepository,
  ) {}

  async createPurchase(payload: any) {
    try {
      await this.purchaseRepository.create({
        purchase_date: new Date(payload.purchase_date),
        bill_no: payload.bill_no,
        supplier_name: payload.supplier_name,
        purchase_item_name: payload.purchase_item_name,
        weight: payload.weight,
        purchase_amount: payload.purchase_amount,
        adat: payload.adat,
        total_amount: payload.total_amount,
      });
      return {
        status: true,
        message: 'Purchase added successfully.',
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async createBulkPurchase(payload: any) {
    try {
      const data: any = JSON.parse(payload.bulk_payload);

      await this.purchaseRepository.createMany(data);

      data.map(async (currData: any) => {
        console.log('currData.purchase_amount: ', currData.purchase_amount);
        console.log('Number(process.env.MARKET_CESS_VALUE): ', 0.0105);

        await this.marketFeeRepository.create({
          purchase_item_name: currData.purchase_item_name,
          market_cess: currData.purchase_amount * 0.0105,
        });
      });
      return {
        status: true,
        message: 'Bulk purchase added successfully.',
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async fetchAllPurchases() {
    try {
      const purchases = await this.purchaseRepository.findMany(
        {
          id: true,
          adat: true,
          bill_no: true,
          purchase_amount: true,
          purchase_date: true,
          purchase_item_name: true,
          supplier_name: true,
          total_amount: true,
          weight: true,
        },
        {},
      );
      return {
        status: true,
        message: 'Purchases fetched successfully.',
        data: purchases,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
