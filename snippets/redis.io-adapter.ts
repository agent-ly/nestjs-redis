import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { IoAdapter } from "@nestjs/platform-socket.io";
import type { Server, ServerOptions } from "socket.io";
import type { AdapterConstructor } from "../lib/interfaces/redis-io.interface";

export class RedisIoAdapter extends IoAdapter {
  constructor(
    app: NestFastifyApplication,
    private readonly adapterConstructor: AdapterConstructor
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options) as Server;
    server.adapter(this.adapterConstructor);
    return server;
  }
}
