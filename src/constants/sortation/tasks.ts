import type { TaskPrioritySchema, TaskSchema, TaskStatusSchema } from "#schema";

export const SORTATION_TASK_SORTABLE_FIELDS = Object.freeze([
  "title",
  "description",
  "status",
  "priority",
  "assignee",
  "createdAt",
  "updatedAt",
] satisfies (keyof TaskSchema)[]);

// #region Sortation Sort Order
export const SORTATION_TASK_PRIORITY_ORDER: Record<TaskPrioritySchema, number> = {
  low: 0,
  medium: 1,
  high: 2,
} as const;
export const SORTATION_TASK_STATUS_ORDER: Record<TaskStatusSchema, number> = {
  pending: 0,
  completed: 1,
} as const;
// #endregion
