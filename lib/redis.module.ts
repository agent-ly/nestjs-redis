import { Module } from "@nestjs/common";
import type {
  RedisModuleOptions,
  RedisModuleAsyncOptions,
} from "./interfaces/redis-options.interface";
import { RedisCoreModule } from "./redis-core.module";
import {
  createRedisAdapterProvider,
  createRedisEmitterProvider,
} from "./redis.providers";

@Module({})
export class RedisModule {
  static forRoot(path?: string, options?: RedisModuleOptions) {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(path, options)],
    };
  }

  static forRootAsync(asyncOptions: RedisModuleAsyncOptions) {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(asyncOptions)],
    };
  }

  static forSocketIoAdapter(connectionName?: string) {
    return {
      module: RedisModule,
      providers: [createRedisAdapterProvider(connectionName)],
    };
  }

  static forSocketIoEmitter(connectionName?: string) {
    return {
      module: RedisModule,
      providers: [createRedisEmitterProvider(connectionName)],
    };
  }
}
