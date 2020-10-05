import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { IntegrationModule } from './integration/integration.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [BookModule, IntegrationModule, ReservationModule],
})
export class ApiModule {}
