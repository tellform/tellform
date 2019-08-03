import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiExcludeEndpoint} from "@nestjs/swagger"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
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
