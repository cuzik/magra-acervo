import { Module } from '@nestjs/common';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';
@Module({
  imports: [ ],
  controllers: [SlackController],
  providers: [SlackService]
})
export class IntegrationModule {}
