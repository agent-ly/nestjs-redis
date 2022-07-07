import { Module } from "@nestjs/common";
import { RedisModule } from "../../lib";
import { AppService } from "./app.service";
import { AppGateway } from "./app.gateway";
import { AppController } from "./app.controller";

@Module({
  imports: [RedisModule.forRoot(), RedisModule.forSocketIoAdapter()],
  providers: [AppService, AppGateway],
  controllers: [AppController],
})
export class AppModule {}
