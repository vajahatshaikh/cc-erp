import { Injectable } from '@nestjs/common';
import { PaginateFunction, paginator } from 'src/modules/prisma/paginator';
import { PrismaService } from 'src/modules/prisma/prisma.service';

// const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class PurchaseRepository {
  constructor(private prismaService: PrismaService) {}

  /**
   * @description
   *  Function to find first matching record for given condition
   */
  async findOne(select: any, where: any = {}) {
    return await this.prismaService.purchase.findFirst({
      select: select,
      where: where,
    });
  }

  /**
   * @description
   * Function to fetch matching records for given condition without pagination
   */
  async findMany(select: any, where: any = {}) {
    return await this.prismaService.purchase.findMany({
      select: select,
      where: where,
    });
  }

  /**
   * @description
   * Function to fetch matching records for given condition with pagination
   */
  // async findManyWithPaginate(page: number, select: any, where: any = {}) {
  //   const pageNumber = page ? page : 1;
  //   return await paginate(
  //     this.prismaService.purchase,
  //     { select: select, where: where },
  //     { page: pageNumber },
  //   );
  // }

  /**
   * @description
   * Function to fetch all records
   */
  async findAll() {
    return await this.prismaService.purchase.findMany();
  }

  /**
   * @description
   * Function to save record
   */
  async create(payload: any) {
    return await this.prismaService.purchase.create({ data: payload });
  }

  /**
   *  @description
   * Function to save multiple record at once
   */
  async createMany(payload: any) {
    return await this.prismaService.purchase.createMany({
      data: payload,
    });
  }

  /**
   * @description
   * Function to update existing record
   */
  async update(where: any, payload: any) {
    return await this.prismaService.purchase.update({
      where: where,
      data: payload,
    });
  }

  /**
   * @description
   * Function to update multiple existing record at once
   */
  async updateMany(where: any, payload: any) {
    return await this.prismaService.purchase.updateMany({
      where: where,
      data: payload,
    });
  }

  /**
   * @description
   * Function to upsert particular record
   */
  async upsert(where: any, createPayload: any, updatePayload: any) {
    return await this.prismaService.purchase.upsert({
      where: where,
      update: updatePayload,
      create: createPayload,
    });
  }

  /**
   * @description
   * Function to delete existing record
   */
  async delete(where: any) {
    return await this.prismaService.purchase.delete({
      where: where,
    });
  }
  /**
   * @description
   * Function to delete multiple existing record at once
   */
  async deleteMany(where: any) {
    return await this.prismaService.purchase.deleteMany({
      where: where,
    });
  }

  /**
   * @description
   * Function to groupBy matching records for given condition
   */
  async fetchTotalPaymentDueByUser(startDate: any, endDate: any) {
    return await this.prismaService.purchase.groupBy({
      _sum: {
        purchase_amount: true,
      },
      where: {
        purchase_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      by: 'supplier_name',
    });
  }

  /**
   * @description
   * Function to groupBy matching records for given condition
   */
  async fetchTotalPaymentDue(startDate: any, endDate: any) {
    return await this.prismaService.purchase.aggregate({
      _sum: {
        purchase_amount: true
      },
      where: {
        purchase_date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  /**
   * @description
   * Function to groupBy matching records for given condition
   */
  async groupBy(where: any, groupBy: any) {
    return await this.prismaService.purchase.groupBy({
      _sum: {
        purchase_amount: true,
      },
      where: where,
      by: groupBy,
    });
  }

  /**
   * @description
   * Function to groupBy matching records for given condition
   */
  async aggregationFunction(condition: any) {
    return await this.prismaService.purchase.aggregate(condition);
  }
}
