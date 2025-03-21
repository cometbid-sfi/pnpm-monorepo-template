import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { logger } from "@pnpmworkspace/logger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    logger.log("Hello World!");
    return this.appService.getHello();
  }
}
