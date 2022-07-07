import { Inject } from "@nestjs/common";
import { getConnectionToken } from "./redis.utils";
import {
  SOCKET_IO_REDIS_ADAPTER,
  SOCKET_IO_REDIS_EMITTER,
} from "../redis.constants";

export const InjectRedis = (name?: string) => Inject(getConnectionToken(name));

export const InjectSocketIoRedisAdapter = () => Inject(SOCKET_IO_REDIS_ADAPTER);

export const InjectSocketIoEmitter = () => Inject(SOCKET_IO_REDIS_EMITTER);
