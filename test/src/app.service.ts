import { Injectable } from "@nestjs/common";
import { InjectRedis } from "../../lib";
import type { Redis } from "ioredis";

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  setKey(key: string, value: string) {
    return this.redis.set(key, value);
  }

  getKey(key: string) {
    return this.redis.get(key);
  }

  deleteKey(key: string) {
    return this.redis.del(key);
  }
}
