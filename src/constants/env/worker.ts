import { cwd } from "node:process";

import { env } from "cloudflare:workers";

/**
 * Worker environment
 */
export const ENV = env.WORKER_ENV || "development";

export const DEFAULT_PORT = 3000;
/**
 * Worker port
 */
export const PORT = parseInt(env.PORT || `${DEFAULT_PORT}`);

/**
 * Current working directory
 */
export const CWD = cwd();
