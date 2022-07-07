import { DEFAULT_REDIS_CONNECTION } from "../redis.constants";

export const getConnectionToken = (name?: string) =>
  name && name !== DEFAULT_REDIS_CONNECTION
    ? `${name}RedisConnection`
    : DEFAULT_REDIS_CONNECTION;
