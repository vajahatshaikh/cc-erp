import { Injectable } from '@nestjs/common';
import { PaginateFunction, paginator } from 'src/modules/prisma/paginator';
import { PrismaService } from 'src/modules/prisma/prisma.service';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  /**
   * @description
   *  Function to find first matching record for given condition
   */
  async findOne(select: any, where: any = {}) {
    return await this.prismaService.user.findFirst({
      select: select,
      where: where,
    });
  }

  /**
   * @description
   * Function to fetch matching records for given condition without pagination
   */
  async findMany(select: any, where: any = {}) {
    return await this.prismaService.user.findMany({
      select: select,
      where: where,
    });
  }

  /**
   * @description
   * Function to fetch matching records for given condition with pagination
   */
  async findManyWithPaginate(page: number, select: any, where: any = {}) {
    const pageNumber = page ? page : 1;
    return await paginate(
      this.prismaService.user,
      { select: select, where: where },
      { page: pageNumber },
    );
  }

  /**
   * @description
   * Function to fetch all records
   */
  async findAll() {
    return await this.prismaService.user.findMany();
  }

  /**
   * @description
   * Function to save record
   */
  async create(payload: any) {
    return await this.prismaService.user.create({ data: payload });
  }

  /**
   *  @description
   * Function to save multiple record at once
   */
  async createMany(payload: any) {
    return await this.prismaService.user.createMany({
      data: payload,
    });
  }

  /**
   * @description
   * Function to update existing record
   */
  async update(where: any, payload: any) {
    return await this.prismaService.user.update({
      where: where,
      data: payload,
    });
  }

  /**
   * @description
   * Function to update multiple existing record at once
   */
  async updateMany(where: any, payload: any) {
    return await this.prismaService.user.updateMany({
      where: where,
      data: payload,
    });
  }

  /**
   * @description
   * Function to upsert particular record
   */
  async upsert(where: any, createPayload: any, updatePayload: any) {
    return await this.prismaService.user.upsert({
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
    return await this.prismaService.user.delete({
      where: where,
    });
  }
  /**
   * @description
   * Function to delete multiple existing record at once
   */
  async deleteMany(where: any) {
    return await this.prismaService.user.deleteMany({
      where: where,
    });
  }
}
