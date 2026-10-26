import path from "node:path";

import { CWD } from "#env";

export const PUBLIC_DIR_PATH = path.join(CWD, "public");

export const TASKS_DATA_PATH = path.join(CWD, "src/data/tasks.json");

export const SQLITE_DATABASE_PATH = path.join(CWD, "src/db/taskflow.db");
