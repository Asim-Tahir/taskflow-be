import { logger } from "#utils";
import { validateTasks } from "#validators";
import type { TaskSchema } from "#schema";

import tasksJSON from "./tasks.json" with { type: "json" };

let tasks: TaskSchema[] = [];

const result = validateTasks(tasksJSON);

if (!result.success) {
  logger.error(result.error.message);
} else {
  tasks = result.data;
}

export default tasks;
