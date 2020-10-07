import { ApiModule } from './modules/api.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), ApiModule],
})
export class AppModule {}
