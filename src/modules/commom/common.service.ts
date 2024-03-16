import { Injectable } from '@nestjs/common';
import { PurchaseItemRepository, SupplierRepository } from './repository';

@Injectable()
export class CommonService {
  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly purchaseItemRepository: PurchaseItemRepository,
  ) {}

  async fetchSuppliers() {
    try {
      const suppliers = await this.supplierRepository.findMany({
        id: true,
        supplier_name: true,
        mobile_number: true,
      });
      return {
        status: true,
        message: 'Suppliers fetched successfully.',
        data: suppliers,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  async fetchPurchaseItems() {
    try {
      const purchaseItems = await this.purchaseItemRepository.findMany({
        id: true,
        item_name: true,
      });
      return {
        status: true,
        message: 'Purchase items fetched successfully.',
        data: purchaseItems,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
