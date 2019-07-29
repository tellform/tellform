import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): object {
    return {
      message: 'hello humanoid',
      _links: {
        doc: '/doc',
        health: '/health'
      }
    };
  }
}
