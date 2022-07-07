import type { FactoryProvider } from "@nestjs/common";
import { Emitter } from "@socket.io/redis-emitter";
import { createAdapter } from "@socket.io/redis-adapter";
import type { Redis } from "ioredis";
import type { AdapterConstructor } from "./interfaces/redis-io.interface";
import { getConnectionToken } from "./common/redis.utils";
import {
  SOCKET_IO_REDIS_ADAPTER,
  SOCKET_IO_REDIS_EMITTER,
} from "./redis.constants";

export const createRedisAdapterProvider = (
  connectionName?: string
): FactoryProvider<Promise<AdapterConstructor>> => ({
  provide: SOCKET_IO_REDIS_ADAPTER,
  useFactory: async (redis: Redis) => {
    const pub = redis,
      sub = redis.duplicate();
    await sub.connect();
    const adapter = createAdapter(pub, sub);
    return adapter;
  },
  inject: [getConnectionToken(connectionName)],
});

export const createRedisEmitterProvider = (
  connectionName?: string
): FactoryProvider<Emitter> => ({
  provide: SOCKET_IO_REDIS_EMITTER,
  useFactory: (redis: Redis) => new Emitter(redis),
  inject: [getConnectionToken(connectionName)],
});
