import { randomUUID } from "node:crypto";

import { sql } from "drizzle-orm";
import { check, index, integer, snakeCase, text } from "drizzle-orm/sqlite-core";

import { TaskPriority, TaskStatus } from "#enums";

export const tasksSchema = snakeCase.table(
  "tasks",
  {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    createdAt: text().$defaultFn(() => new Date().toISOString()).notNull(),
    updatedAt: text().$onUpdateFn(() => new Date().toISOString()),
    deletedAt: text(),
    isDeleted: integer({ mode: "boolean" }).default(false),
    title: text().notNull(),
    description: text(),
    status: text({
      enum: [
        TaskStatus.Pending,
        TaskStatus.Completed
      ]
    }).notNull(),
    priority: text({
      enum: [
        TaskPriority.Low,
        TaskPriority.Medium,
        TaskPriority.High
      ]
    }).notNull(),
    assignee: text().notNull()
  },
  (table) => [
    index("tasks_title_idx").on(table.title),
    index("tasks_description_idx").on(table.description),
    index("tasks_status_idx").on(table.status),
    index("tasks_priority_idx").on(table.priority),
    index("tasks_assignee_idx").on(table.assignee),

    check("tasks_title_min_length", sql`length(${table.title}) >= 3`),
    check("tasks_description_min_length", sql`length(${table.description}) >= 16`),
    check("tasks_assignee_min_length", sql`length(${table.assignee}) >= 3`),
    check(
      "tasks_assignee_format",
      sql`
        ${table.assignee} NOT GLOB '*[^-a-z0-9]*'
        AND ${table.assignee} NOT GLOB '-*'
        AND ${table.assignee} NOT GLOB '*-'
        AND ${table.assignee} NOT GLOB '*--*'
      `
    )
  ]
);