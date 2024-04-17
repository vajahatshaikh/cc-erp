import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfHelper {
  constructor() {}

  async loadTemplate(templateType: string) {
    switch (templateType) {
      case 'DEMO':
        return 'demo';
      case 'PURCHASE_REPORT':
        return 'purchase-report';
      default:
        return false;
    }
  }

  async generate(data: any, templateType: string) {
    try {
      const template = await this.loadTemplate(templateType);
      if (template === false) {
        return {
          status: false,
          message: `Unable to generate PDF template for specified ${templateType}`,
        };
      }
      const templatePath = path.join(
        __dirname, /** SERVER */
        // path.join(__dirname, '..') /**LOCAL */,
        '..',
        '..',
        '..',
        'src',
        'templates',
        `${template}.hbs`,
      );

      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateContent);
      const renderedContent = compiledTemplate(data);

      // Generate PDF using Puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(renderedContent);
      return await page.pdf();
    } catch (error) {
      console.log('====================================');
      console.warn('Error while generating PDF in PdfService: ', error);
      console.log('====================================');
    }
  }
}
