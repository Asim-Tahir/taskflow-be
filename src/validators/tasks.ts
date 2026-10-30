import type { ParamsDictionary } from "express-serve-static-core";
import * as z from "zod/mini";

import {
  taskAssigneeParamsSchema,
  taskCreateSchema,
  taskFilterQuerySchema,
  taskIdParamsSchema,
  taskPartialUpdateSchema,
  taskReportsStatusParamsSchema,
  taskSchema,
  taskSearchQuerySchema,
  taskSortationQuerySchema,
  taskUpdateSchema,
  type TaskAssigneeParamsSchema,
  type TaskCreateSchema,
  type TaskFilterQuerySchema,
  type TaskIdParamsSchema,
  type TaskPartialUpdateSchema,
  type TaskReportsStatusParamsSchema,
  type TaskSchema,
  type TaskSearchQuerySchema,
  type TaskSortationQuerySchema,
  type TaskUpdateSchema,
} from "#schema";

// #region Task
export function validateTask(task: unknown): z.core.util.SafeParseResult<TaskSchema> {
  const result = taskSchema.safeParse(task);

  return result;
}
export async function validateTaskAsync(
  task: unknown,
): Promise<z.core.util.SafeParseResult<TaskSchema>> {
  const result = await taskSchema.safeParseAsync(task);

  return result;
}

export function validateTasks(tasks: unknown[]): z.core.util.SafeParseResult<TaskSchema[]> {
  const result = z.array(taskSchema).safeParse(tasks);

  return result;
}
export async function validateTasksAsync(
  tasks: unknown[],
): Promise<z.core.util.SafeParseResult<TaskSchema[]>> {
  const result = await z.array(taskSchema).safeParseAsync(tasks);

  return result;
}
// #endregion

// #region Task Create
export function validateTaskCreate(task: unknown): z.core.util.SafeParseResult<TaskCreateSchema> {
  const result = taskCreateSchema.safeParse(task);

  return result;
}
export async function validateTaskCreateAsync(
  task: unknown,
): Promise<z.core.util.SafeParseResult<TaskCreateSchema>> {
  const result = await taskCreateSchema.safeParseAsync(task);

  return result;
}
// #endregion

// #region Task Update
export function validateTaskUpdate(task: unknown): z.core.util.SafeParseResult<TaskUpdateSchema> {
  const result = taskUpdateSchema.safeParse(task);

  return result;
}
export async function validateTaskUpdateAsync(
  task: unknown,
): Promise<z.core.util.SafeParseResult<TaskUpdateSchema>> {
  const result = await taskUpdateSchema.safeParseAsync(task);

  return result;
}
// #endregion

// #region Task Partial Update
export function validateTaskPartialUpdate(
  task: unknown,
): z.core.util.SafeParseResult<TaskPartialUpdateSchema> {
  const result = taskPartialUpdateSchema.safeParse(task);

  return result;
}
export async function validateTaskPartialUpdateAsync(
  task: unknown,
): Promise<z.core.util.SafeParseResult<TaskPartialUpdateSchema>> {
  const result = await taskPartialUpdateSchema.safeParseAsync(task);

  return result;
}
// #endregion

// #region Task Filter
export function validateTaskFilterQuery(
  query: object,
): z.core.util.SafeParseResult<TaskFilterQuerySchema> {
  const result = taskFilterQuerySchema.safeParse(query);

  return result;
}
export async function validateTaskFilterQueryAsync(
  query: object,
): Promise<z.core.util.SafeParseResult<TaskFilterQuerySchema>> {
  const result = await taskFilterQuerySchema.safeParseAsync(query);

  return result;
}
// #endregion

// #region Task Sortation
export function validateTaskSortationQuery(
  query: object,
): z.core.util.SafeParseResult<TaskSortationQuerySchema> {
  const result = taskSortationQuerySchema.safeParse(query);

  return result;
}
export async function validateTaskSortationQueryAsync(
  query: object,
): Promise<z.core.util.SafeParseResult<TaskSortationQuerySchema>> {
  const result = await taskSortationQuerySchema.safeParseAsync(query);

  return result;
}
// #endregion

// #region Task Search
export function validateTaskSearchQuery(
  query: object,
): z.core.util.SafeParseResult<TaskSearchQuerySchema> {
  const result = taskSearchQuerySchema.safeParse(query);

  return result;
}
export async function validateTaskSearchQueryAsync(
  query: object,
): Promise<z.core.util.SafeParseResult<TaskSearchQuerySchema>> {
  const result = await taskSearchQuerySchema.safeParseAsync(query);

  return result;
}
// #endregion

// #region Task ID
export function validateTaskIdParams(
  params: ParamsDictionary,
): z.core.util.SafeParseResult<TaskIdParamsSchema> {
  const result = taskIdParamsSchema.safeParse(params);

  return result;
}
export async function validateTaskIdParamsAsync(
  params: ParamsDictionary,
): Promise<z.core.util.SafeParseResult<TaskIdParamsSchema>> {
  const result = await taskIdParamsSchema.safeParseAsync(params);

  return result;
}
// #endregion

// #region Task assignee
export function validateTaskAssigneeParams(
  params: ParamsDictionary,
): z.core.util.SafeParseResult<TaskAssigneeParamsSchema> {
  const result = taskAssigneeParamsSchema.safeParse(params);

  return result;
}
export async function validateTaskAssigneeParamsParamsAsync(
  params: ParamsDictionary,
): Promise<z.core.util.SafeParseResult<TaskAssigneeParamsSchema>> {
  const result = await taskAssigneeParamsSchema.safeParseAsync(params);

  return result;
}
// #endregioon

// #region Task Reports
export function validateTaskReportsStatusParams(
  params: ParamsDictionary,
): z.core.util.SafeParseResult<TaskReportsStatusParamsSchema> {
  const result = taskReportsStatusParamsSchema.safeParse(params);

  return result;
}

export async function validateTaskReportsStatusParamsAsync(
  params: ParamsDictionary,
): Promise<z.core.util.SafeParseResult<TaskReportsStatusParamsSchema>> {
  const result = await taskReportsStatusParamsSchema.safeParseAsync(params);

  return result;
}
// #endregion
