import { Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  setKey(@Query("key") key: string, @Query("value") value: string) {
    return this.appService.setKey(key, value);
  }

  @Get()
  getKey(@Query("key") key: string) {
    return this.appService.getKey(key);
  }

  @Delete()
  deleteKey(@Query("key") key: string) {
    return this.appService.deleteKey(key);
  }
}
