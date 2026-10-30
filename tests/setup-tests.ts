import type { Server } from "http";
import { styleText } from "node:util";

import { loadDotEnv } from "#utils";

let server: Server;

/**
 * Setup shared resources, state, or environment
 * Run servers, create files, prepare databases, etc.
 */
export async function globalSetup() {
  await loadDotEnv();

  const { default: app } = await import("#src/app");
  const { PORT } = await import("#env");

  server = app.listen(PORT);
  await new Promise((resolve) => server.once("listening", resolve));

  console.log(`${styleText(["green", "bold", "italic"], "Taskflow")} server is running on ${styleText(["gray", "underline"], `http://localhost:${PORT}`)}`);
  console.log(`${styleText(["greenBright", "bold", "italic"], "Swagger UI")} is running on ${styleText(["gray", "underline"], `http://localhost:${PORT}/swagger/`)}\n`);

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Test server did not bind to a TCP port");
  }
}

/**
 * Clean up resources, state, or environment
 * Close servers, remove files, disconnect from databases, etc.
 */
export async function globalTeardown() {
  await new Promise<void>((resolve, reject) => {
    if (server) {
      server.close((error) => error ? reject(error) : resolve());
    }
  });
}