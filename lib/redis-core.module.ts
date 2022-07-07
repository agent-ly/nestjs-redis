import { ModuleRef } from "@nestjs/core";
import { Global, Inject, Module, OnApplicationShutdown } from "@nestjs/common";
import IORedis from "ioredis";
import type { Redis } from "ioredis";
import type {
  RedisModuleOptions,
  RedisModuleAsyncOptions,
} from "./interfaces/redis-options.interface";
import { createAsyncProviders } from "./common/provider.utils";
import { getConnectionToken } from "./common/redis.utils";
import { REDIS_CONNECTION_NAME, REDIS_MODULE_OPTIONS } from "./redis.constants";

@Global()
@Module({})
export class RedisCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(REDIS_CONNECTION_NAME) private readonly connectionName: string,
    private readonly moduleRef: ModuleRef
  ) {}

  static forRoot(
    path = "redis://localhost:6379",
    options: RedisModuleOptions = {}
  ) {
    const { connectionName, ...redisOptions } = options;
    const redisConnectionName = getConnectionToken(connectionName);
    const connectionNameProvider = {
      provide: REDIS_CONNECTION_NAME,
      useValue: redisConnectionName,
    };
    const connectionProvider = {
      provide: redisConnectionName,
      useFactory: async () => {
        const connection = new IORedis(path, {
          ...redisOptions,
          lazyConnect: true,
        });
        await connection.connect();
        return connection;
      },
    };
    return {
      module: RedisCoreModule,
      providers: [connectionProvider, connectionNameProvider],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(asyncOptions: RedisModuleAsyncOptions) {
    const redisConnectionName = getConnectionToken(asyncOptions.connectionName);
    const connectionNameProvider = {
      provide: REDIS_CONNECTION_NAME,
      useValue: redisConnectionName,
    };
    const asyncProviders = createAsyncProviders(
      REDIS_MODULE_OPTIONS,
      asyncOptions
    );
    const connectionProvider = {
      provide: redisConnectionName,
      useFactory: async (options: RedisModuleOptions) => {
        const connection = new IORedis(options);
        await connection.connect();
        return connection;
      },
      inject: [REDIS_MODULE_OPTIONS],
    };
    return {
      module: RedisCoreModule,
      imports: asyncOptions.imports,
      providers: [
        ...asyncProviders,
        connectionProvider,
        connectionNameProvider,
      ],
      exports: [connectionProvider],
    };
  }

  async onApplicationShutdown() {
    const connection = this.moduleRef.get<Redis>(this.connectionName);
    if (connection) await connection.quit();
  }
}
