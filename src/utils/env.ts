import path from "node:path";
import { styleText } from "node:util";
import { loadEnvFile } from "node:process";

import { ENV, CWD } from "#env";
import { isFileExists, logger } from "#utils";

/**
 * Loads environment variables from `<projectRoot>/.env` or `<projectRoot>/.env.<env>` files
 */
export async function loadDotEnv() {
  const envPath = path.join(CWD, ".env");
  const subEnvPath = path.join(CWD, `.env.${ENV}`);

  try {
    const isEnvFileExists = await isFileExists(envPath);
    const isSubEnvFileExists = await isFileExists(subEnvPath);

    if (isEnvFileExists) {
      loadEnvFile(envPath);
    }

    if (isSubEnvFileExists) {
      loadEnvFile(subEnvPath);
    }

    if (!isEnvFileExists && !isSubEnvFileExists) {
      logger.warn(
        `No \`${styleText("bold", ".env")}\` or \`${styleText("bold", `.env.${ENV}`)}\` files found. Using default environment variables.`,
      );
    }
  } catch (error) {
    logger.error("Error loading environment variables:", error);
  }
}
