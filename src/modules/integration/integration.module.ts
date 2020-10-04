import { Module } from '@nestjs/common';
import { SlackController } from './slack.controller';
@Module({
  imports: [ ],
  controllers: [SlackController]
})
export class IntegrationModule {}
