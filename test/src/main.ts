import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { AdapterConstructor, SOCKET_IO_REDIS_ADAPTER } from "../../lib";
import { RedisIoAdapter } from "../../snippets/redis.io-adapter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const adapterConstructor = app.get<AdapterConstructor>(
    SOCKET_IO_REDIS_ADAPTER
  );
  app.useWebSocketAdapter(new RedisIoAdapter(app, adapterConstructor));
  await app.listen(3000);
}
bootstrap();
