import * as z from "zod/mini";

import { SORTATION_ORDER_FIELDS, SORTATION_TASK_SORTABLE_FIELDS } from "#constants";
import { TaskPriority, TaskStatus } from "#enums";

import { baseEntitySchema } from "./entity.ts";

export const taskStatusSchema = z.enum(TaskStatus);
export type TaskStatusSchema = z.infer<typeof taskStatusSchema>;

export const taskPrioritySchema = z.enum(TaskPriority);
export type TaskPrioritySchema = z.infer<typeof taskPrioritySchema>;

export const taskAssigneeSchema = z.string().check(
  z.minLength(3),
  z.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
);

export const taskSchema = z.safeExtend(baseEntitySchema, {
  title: z.string().check(z.minLength(3)),
  description: z.optional(z.string().check(z.minLength(16))),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  assignee: z.optional(taskAssigneeSchema),
});
export type TaskSchema = z.infer<typeof taskSchema>;

export const taskCreateSchema = z.object({
  title: z.string().check(z.minLength(3)),
  description: z.optional(z.string().check(z.minLength(16))),
  priority: taskPrioritySchema,
});
export type TaskCreateSchema = z.infer<typeof taskCreateSchema>;

export const taskUpdateSchema = z.object({
  title: z.string().check(z.minLength(3)),
  description: z.optional(z.string().check(z.minLength(16))),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  assignee: z.optional(taskAssigneeSchema),
});
export type TaskUpdateSchema = z.infer<typeof taskUpdateSchema>;

export const taskPartialUpdateSchema = z.partial(taskUpdateSchema);
export type TaskPartialUpdateSchema = z.infer<typeof taskPartialUpdateSchema>;

export const taskReportsStatusParamsSchema = z.object({
  status: taskStatusSchema
});
export type TaskReportsStatusParamsSchema = z.infer<typeof taskReportsStatusParamsSchema>;

export const taskFilterQuerySchema = z.partial(
  z.object({
    title: z.string().check(z.minLength(3)),
    description: z.string().check(z.minLength(3)),
    status: taskStatusSchema,
    priority: taskPrioritySchema,
    assignee: taskAssigneeSchema
  })
);
export type TaskFilterQuerySchema = z.infer<typeof taskFilterQuerySchema>;

export const taskSearchQuerySchema = z.partial(
  z.object({
    keyword: z.string()
  })
);
export type TaskSearchQuerySchema = z.infer<typeof taskSearchQuerySchema>;

export const taskIdParamsSchema = z.object({
  id: z.uuidv4()
});
export type TaskIdParamsSchema = z.infer<typeof taskIdParamsSchema>;

export const taskAssigneeParamsSchema = z.object({
  assignee: taskAssigneeSchema
});
export type TaskAssigneeParamsSchema = z.infer<typeof taskAssigneeParamsSchema>;

const taskSortFieldSchema = z.enum(SORTATION_TASK_SORTABLE_FIELDS);
const orderFieldSchema = z.enum(SORTATION_ORDER_FIELDS);

export const taskSortationQuerySchema = z.partial(
  z.object({
    sort: taskSortFieldSchema,
    order: orderFieldSchema
  })
);
export type TaskSortationQuerySchema = z.infer<typeof taskSortationQuerySchema>;
