import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger as log } from '@pnpmworkspace/logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    log('Hello World!');
    return this.appService.getHello();
  }
}
