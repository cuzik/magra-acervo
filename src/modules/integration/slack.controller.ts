import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('integration/slack')
export class SlackController {
  constructor(private slackService: SlackService) {}

  @Post()
  @HttpCode(200)
  public async actionBot(
    @Body() body: { user_name: string; text: string },
  ): Promise<string> {
    const is_valid = this.slackService.validateCommand(body.text);

    if (!is_valid) {
      return 'Comando inválido veja mais em `/acervo help`';
    }

    return this.slackService.runCommand(body.user_name, body.text);
  }
}
