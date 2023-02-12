import { Controller, Get, Render } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Controller()
export class QrcodeController {
  constructor(private qrcodeService: QrcodeService) {}
  @Get()
  @Render('index')
  async root() {
    return await this.qrcodeService.generateCode();
  }

  @Get('qrcodes')
  async getQrcode() {
    return await this.qrcodeService.generateCode();
  }
}
