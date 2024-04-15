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
      // __dirname,
      join(__dirname, '..'),
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
      const readStream = fs.createReadStream(filePath);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${fileName}"`,
      );

      readStream.pipe(res);
      // return res.sendFile(filePath);
    } catch (error) {
      console.error('Error fetching file:', error);
      return res.status(404).send('File not found'); // Handle errors gracefully
    }
  }

  @Get('download')
  async downloadFile(@Res() res: Response) {
    try {
      // Read the file into memory
      const filePath = join(
        __dirname, /** SERVER */
        // join(__dirname, '..'), /**LOCAL */
        '..',
        'src',
        'templates',
        'test.pdf',
      ); // Adjust path as needed // Update with your file path
      const fileContent = fs.readFileSync(filePath);

      // Create a blob object
      const blob = new Blob([fileContent], { type: 'application/pdf' }); // Adjust the MIME type accordingly

      // Send the blob object as the response
      res.setHeader('Content-Disposition', 'attachment; filename="test.pdf"'); // Optional: Set the filename for download
      res.setHeader('Content-Type', 'application/pdf'); // Set the appropriate content type
      res.send(fileContent);
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
