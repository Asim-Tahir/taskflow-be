import { cwd } from "node:process";

/**
 * Node environment
 */
export const ENV = process.env.NODE_ENV || "development";

export const DEFAULT_PORT = 3000;
/**
 * Node server port
 */
export const PORT = parseInt(process.env.PORT || `${DEFAULT_PORT}`);

/**
 * Host address for the Node server
*/
export const HOST = ENV === "production" ? "0.0.0.0" : "127.0.0.1";

/**
 * Current working directory
 */
export const CWD = cwd();
