import { Injectable } from '@nestjs/common';
import { PurchaseRepository } from './repository';

@Injectable()
export class PurchaseService {
  constructor(private readonly purchaseRepository: PurchaseRepository) {}

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
      const data = JSON.parse(payload.bulk_payload);

      await this.purchaseRepository.createMany(data);
      return {
        status: true,
        message: 'Bulk purchase added successfully.',
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
