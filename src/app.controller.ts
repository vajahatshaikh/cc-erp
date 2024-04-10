import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import path, { join } from 'path';
import { Response } from 'express';
import * as fs from 'fs'; // Import fs module directly

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('file/:fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = join(
      __dirname,
      // join(__dirname, '..'),
      '..',
      'src',
      'templates',
      fileName,
    ); // Adjust path as needed
    try {
      await new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            reject(new Error(`File not found: ${filePath}`));
          } else {
            resolve(true);
          }
        });
      });
      return res.sendFile(filePath);
    } catch (error) {
      console.error('Error fetching file:', error);
      return res.status(404).send('File not found'); // Handle errors gracefully
    }
  }
}
