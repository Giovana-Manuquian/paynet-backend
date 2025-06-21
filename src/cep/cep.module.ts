import { Module } from '@nestjs/common';
//import { HttpModule } from '@nestjs/axios';
import { CepService } from './cep.service';
import { HttpModule as NestHttpModule } from '@nestjs/axios';

@Module({
  imports: [NestHttpModule],
  providers: [CepService],
  exports: [CepService],
})
export class CepModule {}
