import type { createAdapter } from "@socket.io/redis-adapter";

export type AdapterConstructor = ReturnType<typeof createAdapter>;
