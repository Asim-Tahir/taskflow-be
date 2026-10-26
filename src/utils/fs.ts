import type { PathLike } from "node:fs";
import fs from "node:fs/promises";

/**
 * Checks if a file exists at the given path.
 */
export async function isFileExists(filePath: PathLike): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read the file at the given path
 */
export async function readFile(filePath: PathLike): Promise<string> {
  try {
    const content = await fs.readFile(filePath, { flag: "r", encoding: "utf-8" });
  
    return content;
  } catch {
    return "";
  }
}

/**
 * Write {@link content the content} of the file to {@link filePath the given path}
 */
export async function writeFile(filePath: PathLike, content: string): Promise<boolean> {
  try {
    await fs.writeFile(filePath, content, { flag: "w", encoding: "utf-8" });

    return true;
  } catch {
    return false;
  }
}
