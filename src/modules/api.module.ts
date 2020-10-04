import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [BookModule, IntegrationModule],
})
export class ApiModule {}
