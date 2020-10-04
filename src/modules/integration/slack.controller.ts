import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('integration/slack')
export class SlackController {
  @Post()
  actionBot(@Req() request: Request): string {
    console.log(request.body)

    return request.body;
  }
}
