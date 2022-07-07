import type { RedisOptions } from "ioredis";
import type { AsyncOptionsProvider } from "../common/provider.utils";

export type ModuleOptions = { connectionName?: string };

export type RedisModuleOptions = ModuleOptions & RedisOptions;

export type RedisOptionsFactory = {
  createOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
};

export type RedisModuleAsyncOptions = ModuleOptions &
  AsyncOptionsProvider<RedisModuleOptions, RedisOptionsFactory>;
