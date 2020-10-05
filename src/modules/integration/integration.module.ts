import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCopy } from '../book/book-copy.entity';
import { Reservation } from '../reservation/reservation.entity';
import { ReturnService } from './return/return.service';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';
import { TakeService } from './take/take.service';
@Module({
  imports: [TypeOrmModule.forFeature([BookCopy, Reservation])],
  controllers: [SlackController],
  providers: [SlackService, TakeService, ReturnService]
})
export class IntegrationModule {}
