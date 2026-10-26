import { Router } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import { TASK_UNASSIGNED_ASSIGNEE } from "#constants";
import { taskReportsStatusParamsValidationMiddleware } from "#middlewares";
import { TasksLowDBRepository } from "#repositories";
import type { TaskPrioritySchema, TaskReportsStatusParamsSchema, TaskSchema, TaskStatusSchema } from "#schema";
import type { ResponseBody, ResponseBodyPaginated } from "#types";

const reportsRouter = Router();

interface ReportsSummaryResponseData {
  total: number;
  breakdown: {
    status: Record<TaskStatusSchema, number>;
    priority: Record<TaskPrioritySchema, number>;
    assignee: Record<string, number>;
  }
}

reportsRouter.get<ParamsDictionary, ResponseBody<ReportsSummaryResponseData>, any>(
  "/summary",
  async (_req, res) => {
    const repository = await TasksLowDBRepository.open();
    // const repository = TasksFileSystemRepository.open();
    const tasks = await repository.getAllAsync();

    const groupedTasksByStatus = Map.groupBy(tasks, (task) => task.status);
    const groupedTasksByPriority = Map.groupBy(tasks, (task) => task.priority);
    const groupedTasksByAssignee = Map.groupBy(tasks, (task) => task.assignee ?? TASK_UNASSIGNED_ASSIGNEE);

    const statusBreakdown = Array.from(groupedTasksByStatus.entries()).reduce((prev, [key, group]) => {
      prev[key] = group?.length ?? 0;

      return prev;
    }, {} as Record<TaskStatusSchema, number>);

    const priorityBreakdown = Array.from(groupedTasksByPriority.entries()).reduce((prev, [key, group]) => {
      prev[key] = group?.length ?? 0;

      return prev;
    }, {} as Record<TaskPrioritySchema, number>);

    const assigneeBreakdown = Array.from(groupedTasksByAssignee.entries()).reduce((prev, [key, group]) => {
      prev[key] = group?.length ?? 0;

      return prev;
    }, {} as Record<string, number>);

    res.status(200).json({
      success: true,
      data: {
        total: tasks.length,
        breakdown: {
          status: statusBreakdown,
          priority: priorityBreakdown,
          assignee: assigneeBreakdown
        },
      }
    });
  }
);

reportsRouter.get<TaskReportsStatusParamsSchema, ResponseBodyPaginated<TaskSchema>, any>(
  "/:status",
  taskReportsStatusParamsValidationMiddleware,
  async (req, res) => {
    const { page, limit, startIndex, endIndex } = req.paginate();

    const { status } = req.params;

    const repository = await TasksLowDBRepository.open();
    // const repository = TasksFileSystemRepository.open();
    const tasks = await repository.getAllAsync();

    const groupedTasksByStatus = Map.groupBy(tasks, (task) => task.status);

    let statusTasks = groupedTasksByStatus.get(status) ?? [];

    statusTasks = statusTasks.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: statusTasks,
      page,
      limit,
      total: statusTasks.length,
    });
  }
);

export default reportsRouter;
