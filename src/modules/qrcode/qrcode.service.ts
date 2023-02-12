import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Qrcode from 'qrcode';
import { generateRandomNumList } from 'src/utils';

@Injectable()
export class QrcodeService {
  constructor(private configService: ConfigService) {}
  async generateCode() {
    const [mov1, mov2, mov3, mov4, mov5, mov6, mov7, mov8, mov9, mov10] =
      generateRandomNumList(10);
    const serverUrl = this.configService.get('SERVER_URL');
    const movieLink = `${serverUrl}/movies?mov1=${mov1}&mov2=${mov2}&mov3=${mov3}&mov4=${mov4}&mov5=${mov5}&mov6=${mov6}&mov7=${mov7}&mov8=${mov8}&mov9=${mov9}&mov10=${mov10}`;
    const code = await Qrcode.toDataURL(movieLink);
    return { data: code };
  }
}
