import { Injectable } from '@nestjs/common';
import { MarketFeeRepository, PurchaseRepository } from './repository';
import { PdfHelper } from './pdf-helper';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly marketFeeRepository: MarketFeeRepository,
    private readonly pdfHelper: PdfHelper,
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

  async formtDate(anyDate: any) {
    // Create a new Date object
    var date = new Date(anyDate);

    // Define months array
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Get day, month, and year
    var day = date.getDate(); // Returns the day of the month (1-31)
    var month = months[date.getMonth()]; // Returns the month (0-11)
    var year = date.getFullYear(); // Returns the year (four digits)

    // Concatenate day, month, and year in the desired format
    var formattedDate = ('0' + day).slice(-2) + ' ' + month + ' ' + year;

    return formattedDate;
  }

  async downloadPurchases(startDate: any, endDate: any) {
    try {
      const purchases: any = await this.purchaseRepository.findMany(
        {
          purchase_date: true,
          bill_no: true,
          supplier_name: true,
          purchase_item_name: true,
          weight: true,
          purchase_amount: true,
          adat: true,
          total_amount: true,
        },
        {
          purchase_date: {
            gte: startDate,
            lte: endDate,
          },
        },
      );

      if (purchases.length === 0) {
        return {
          status: false,
          message: 'No data found.',
        };
      }

      // Does Table has rows
      let wheatHasRows = false;
      let turHasRows = false;
      let chanaHasRows = false;
      let soyabeanHasRows = false;
      let turKachariHasRows = false;

      // Weight Total
      let wheatKgTo = 0;
      let turKgTo = 0;
      let chanaKgTo = 0;
      let soyabeanKgTo = 0;
      let turKachariKgTo = 0;

      // Purchase Amount Total
      let wheatPurAmtTo = 0;
      let turPurAmtTo = 0;
      let chanaPurAmtTo = 0;
      let soyabeanPurAmtTo = 0;
      let turKachariPurAmtTo = 0;

      // Adat Total
      let wheatAdatTo = 0;
      let turAdatTo = 0;
      let chanaAdatTo = 0;
      let soyabeanAdatTo = 0;
      let turKachariAdatTo = 0;

      // Total Total
      let wheatTotalTo = 0;
      let turTotalTo = 0;
      let chanaTotalTo = 0;
      let soyabeanTotalTo = 0;
      let turKachariTotalTo = 0;

      for (const item of purchases) {
        item.isTur = false;
        item.isChana = false;
        item.isSoyabean = false;
        item.isWheat = false;
        item.isTurKachari = false;

        if (item.purchase_item_name === 'Tur') {
          item.isTur = true;
          item.purchase_item_name = 'TUR';
          turKgTo += parseFloat(item.weight);
          turPurAmtTo += parseFloat(item.purchase_amount);
          turAdatTo += parseFloat(item.adat);
          turTotalTo += parseFloat(item.total_amount);
          turHasRows = true;
        } else if (item.purchase_item_name === 'Chana') {
          item.isChana = true;
          item.purchase_item_name = 'CHANA';
          chanaKgTo += parseFloat(item.weight);
          chanaPurAmtTo += parseFloat(item.purchase_amount);
          chanaAdatTo += parseFloat(item.adat);
          chanaTotalTo += parseFloat(item.total_amount);
          chanaHasRows = true;
        } else if (item.purchase_item_name === 'Soyabean') {
          item.isSoyabean = true;
          item.purchase_item_name = 'SOYABEAN';
          soyabeanKgTo += parseFloat(item.weight);
          soyabeanPurAmtTo += parseFloat(item.purchase_amount);
          soyabeanAdatTo += parseFloat(item.adat);
          soyabeanTotalTo += parseFloat(item.total_amount);
          soyabeanHasRows = true;
        } else if (item.purchase_item_name === 'Wheat') {
          item.isWheat = true;
          item.purchase_item_name = 'WHEAT';
          wheatKgTo += parseFloat(item.weight);
          wheatPurAmtTo += parseFloat(item.purchase_amount);
          wheatAdatTo += parseFloat(item.adat);
          wheatTotalTo += parseFloat(item.total_amount);
          wheatHasRows = true;
        } else if (item.purchase_item_name === 'Tur Kachari') {
          item.isTurKachari = true;
          item.purchase_item_name = 'TUR KACHARI';
          turKachariKgTo += parseFloat(item.weight);
          turKachariPurAmtTo += parseFloat(item.purchase_amount);
          turKachariAdatTo += parseFloat(item.adat);
          turKachariTotalTo += parseFloat(item.total_amount);
          turKachariHasRows = true;
        }
        item.purchase_date = await this.formtDate(item.purchase_date);
      }

      // PADTA (AVG)
      const chanaPadtaRes = await this.purchaseRepository.aggregationFunction({
        _avg: {
          purchase_amount: true,
          weight: true,
          adat: true,
        },
        where: {
          purchase_date: {
            gte: startDate,
            lte: endDate,
          },
          purchase_item_name: {
            equals: 'Chana',
            mode: 'insensitive',
          },
        },
      });

      const wheatPadtaRes = await this.purchaseRepository.aggregationFunction({
        _avg: {
          purchase_amount: true,
          weight: true,
          adat: true,
        },
        where: {
          purchase_date: {
            gte: startDate,
            lte: endDate,
          },
          purchase_item_name: {
            equals: 'Wheat',
            mode: 'insensitive',
          },
        },
      });

      const turPadtaRes = await this.purchaseRepository.aggregationFunction({
        _avg: {
          purchase_amount: true,
          weight: true,
          adat: true,
        },
        where: {
          purchase_date: {
            gte: startDate,
            lte: endDate,
          },
          purchase_item_name: {
            equals: 'Tur',
            mode: 'insensitive',
          },
        },
      });

      const soyabeanPadtaRes =
        await this.purchaseRepository.aggregationFunction({
          _avg: {
            purchase_amount: true,
            weight: true,
            adat: true,
          },
          where: {
            purchase_date: {
              gte: startDate,
              lte: endDate,
            },
            purchase_item_name: {
              equals: 'Soyabean',
              mode: 'insensitive',
            },
          },
        });

      const turKachariPadtaRes =
        await this.purchaseRepository.aggregationFunction({
          _avg: {
            purchase_amount: true,
            weight: true,
            adat: true,
          },
          where: {
            purchase_date: {
              gte: startDate,
              lte: endDate,
            },
            purchase_item_name: {
              equals: 'Tur Kachari',
              mode: 'insensitive',
            },
          },
        });

      let wheatPadtaPurAmt = wheatPadtaRes._avg.purchase_amount;
      let turPadtaPurAmt = turPadtaRes._avg.purchase_amount;
      let soyabeanPadtaPurAmt = soyabeanPadtaRes._avg.purchase_amount;
      let chanaPadtaPurAmt = chanaPadtaRes._avg.purchase_amount;
      let turKachariPadtaPurAmt = turKachariPadtaRes._avg.purchase_amount;

      // PADTA (AVG) {KG}
      let wheatPadtaWeight = wheatPadtaRes._avg.weight;
      let turPadtaWeight = turPadtaRes._avg.weight;
      let chanaPadtaWeight = chanaPadtaRes._avg.weight;
      let soyabeanPadtaWeight = soyabeanPadtaRes._avg.weight;
      let turKachariPadtaWeight = turKachariPadtaRes._avg.weight;

      let wheatPadtaAdat = wheatPadtaRes._avg.adat;
      let turPadtaAdat = turPadtaRes._avg.adat;
      let chanaPadtaAdat = chanaPadtaRes._avg.adat;
      let soyabeanPadtaAdat = soyabeanPadtaRes._avg.adat;
      let turKachariPadtaAdat = turKachariPadtaRes._avg.adat;

      // Total Payment Due
      let totalPaymentDue: any =
        await this.purchaseRepository.fetchTotalPaymentDue(startDate, endDate);
      let wheatMarketFee = (1.05 / 100) * wheatPurAmtTo; // Calculate 1.05% of purchase amount
      let turMarketFee = (1.05 / 100) * turPurAmtTo; // Calculate 1.05% of purchase amount
      let chanaMarketFee = (1.05 / 100) * chanaPurAmtTo; // Calculate 1.05% of purchase amount
      let soyabeanMarketFee = (1.05 / 100) * soyabeanPurAmtTo; // Calculate 1.05% of purchase amount
      let turKachariMarketFee = (1.05 / 100) * turKachariPurAmtTo; // Calculate 1.05% of purchase amount

      const totalPaymentDues =
        await this.purchaseRepository.fetchTotalPaymentDueByUser(
          startDate,
          endDate,
        );

      let data = {
        startDate: new Date(startDate).toDateString(),
        endDate: new Date(endDate).toDateString(),
        dateOfStatement: new Date().toDateString(),
        purchases: purchases,
        wheatKgTo: wheatKgTo?.toFixed(2),
        turKgTo: turKgTo?.toFixed(2),
        chanaKgTo: chanaKgTo?.toFixed(2),
        soyabeanKgTo: soyabeanKgTo?.toFixed(2),
        turKachariKgTo: turKachariKgTo?.toFixed(2),
        wheatPurAmtTo: wheatPurAmtTo?.toFixed(2),
        turPurAmtTo: turPurAmtTo?.toFixed(2),
        chanaPurAmtTo: chanaPurAmtTo?.toFixed(2),
        soyabeanPurAmtTo: soyabeanPurAmtTo?.toFixed(2),
        turKachariPurAmtTo: turKachariPurAmtTo?.toFixed(2),
        wheatAdatTo: wheatAdatTo?.toFixed(2),
        turAdatTo: turAdatTo?.toFixed(2),
        chanaAdatTo: chanaAdatTo?.toFixed(2),
        soyabeanAdatTo: soyabeanAdatTo?.toFixed(2),
        turKachariAdatTo: turKachariAdatTo?.toFixed(2),
        wheatTotalTo: wheatTotalTo?.toFixed(2),
        turTotalTo: turTotalTo?.toFixed(2),
        chanaTotalTo: chanaTotalTo?.toFixed(2),
        soyabeanTotalTo: soyabeanTotalTo?.toFixed(2),
        turKachariTotalTo: turKachariTotalTo?.toFixed(2),
        wheatHasRows: wheatHasRows,
        turHasRows: turHasRows,
        chanaHasRows: chanaHasRows,
        soyabeanHasRows: soyabeanHasRows,
        turKachariHasRows: turKachariHasRows,
        wheatPadtaPurAmt: wheatPadtaPurAmt?.toFixed(2),
        wheatPadtaWeight: wheatPadtaWeight?.toFixed(2),
        wheatPadtaAdat: wheatPadtaAdat?.toFixed(2),
        turPadtaPurAmt: turPadtaPurAmt?.toFixed(2),
        turPadtaWeight: turPadtaWeight?.toFixed(2),
        turPadtaAdat: turPadtaAdat?.toFixed(2),
        chanaPadtaPurAmt: chanaPadtaPurAmt?.toFixed(2),
        chanaPadtaWeight: chanaPadtaWeight?.toFixed(2),
        chanaPadtaAdat: chanaPadtaAdat?.toFixed(2),
        soyabeanPadtaPurAmt: soyabeanPadtaPurAmt?.toFixed(2),
        soyabeanPadtaWeight: soyabeanPadtaWeight?.toFixed(2),
        soyabeanPadtaAdat: soyabeanPadtaAdat?.toFixed(2),
        turKachariPadtaPurAmt: turKachariPadtaPurAmt?.toFixed(2),
        turKachariPadtaWeight: turKachariPadtaWeight?.toFixed(2),
        turKachariPadtaAdat: turKachariPadtaAdat?.toFixed(2),
        totalPaymentDue: totalPaymentDue,
        wheatMarketFee: wheatMarketFee?.toFixed(2),
        turMarketFee: turMarketFee?.toFixed(2),
        chanaMarketFee: chanaMarketFee?.toFixed(2),
        soyabeanMarketFee: soyabeanMarketFee?.toFixed(2),
        turKachariMarketFee: turKachariMarketFee?.toFixed(2),
        totalPaymentDues: totalPaymentDues,
      };

      const pdfBuffer = await this.pdfHelper.generate(data, 'PURCHASE_REPORT');

      return {
        status: true,
        message: 'Downloaded success.',
        data: pdfBuffer,
      };
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
