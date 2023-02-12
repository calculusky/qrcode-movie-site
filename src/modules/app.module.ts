import { Module } from '@nestjs/common';
import { QrcodeModule } from './qrcode/qrcode.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), QrcodeModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
