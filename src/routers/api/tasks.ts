import { Router } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import {
    SORTATION_TASK_PRIORITY_ORDER,
    SORTATION_TASK_STATUS_ORDER,
    TASK_UNASSIGNED_ASSIGNEE
} from "#constants";
import { tasks } from "#data";
import {
    assigneeParamsValidationMiddleware,
    paginationValidationMiddleware,
    taskAssigneeParamsValidationMiddleware,
    taskCreateBodyValidationMiddleware,
    taskFilterQueryValidationMiddleware,
    taskIdParamsValidationMiddleware,
    taskPartialUpdateBodyValidationMiddleware,
    taskSearchQueryValidationMiddleware,
    taskSortationQueryValidationMiddleware,
    taskUpdateBodyValidationMiddleware
} from "#middlewares";
import type {
    TaskAssigneeParamsSchema,
    TaskCreateSchema,
    TaskFilterQuerySchema,
    TaskIdParamsSchema,
    TaskPartialUpdateSchema,
    TaskSchema,
    TaskSearchQuerySchema,
    TaskSortationQuerySchema,
    TaskUpdateSchema
} from "#schema";
import type { ResponseBody, ResponseBodyPaginated } from "#types";

const tasksRouter = Router();

tasksRouter.get<ParamsDictionary, ResponseBodyPaginated<TaskSchema>, any, TaskFilterQuerySchema & TaskSortationQuerySchema>("/",
  paginationValidationMiddleware,
  taskSortationQueryValidationMiddleware,
  taskFilterQueryValidationMiddleware,
  (req, res) => {
    const { title, description, status, priority, assignee, sort = "title", order = "asc" } = req.query;
    const { page, limit, startIndex, endIndex } = req.paginate();

    let filteredTasks = structuredClone(tasks);

    if (title) {
      filteredTasks = filteredTasks.filter((task) => task.title.toLocaleLowerCase("tr-TR").includes(title.toLocaleLowerCase("tr-TR")));
    }

    if (description) {
      filteredTasks = filteredTasks.filter((task) => task.description?.toLocaleLowerCase("tr-TR")?.includes?.(description?.toLocaleLowerCase("tr-TR")));
    }

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (priority) {
      filteredTasks = filteredTasks.filter((task) => task.priority === priority);
    }

    if (assignee) {
      filteredTasks = filteredTasks.filter((task) => task.assignee === assignee);
    }

    if (sort) {
      const direction = order === "desc" ? -1 : 1;

      const collator = new Intl.Collator("tr-TR", {
        usage: "sort",
        sensitivity: "base",
        numeric: true,
      });

      filteredTasks.sort((taskA, taskB) => {
        let comparison = 0;

        switch (sort) {
          case "title":
            comparison = collator.compare(taskA.title, taskB.title);
            break;

          case "description":
            comparison = collator.compare(taskA.description ?? '', taskB.description ?? '');
            break;

          case "priority":
            comparison = SORTATION_TASK_PRIORITY_ORDER[taskA.priority] - SORTATION_TASK_PRIORITY_ORDER[taskB.priority];
            break;

          case "status":
            comparison = SORTATION_TASK_STATUS_ORDER[taskA.status] - SORTATION_TASK_STATUS_ORDER[taskB.status];
            break;

          case "assignee":
            comparison = collator.compare(taskA.assignee ?? TASK_UNASSIGNED_ASSIGNEE, taskB.assignee ?? TASK_UNASSIGNED_ASSIGNEE);
            break;

          case "createdAt":
            comparison = Date.parse(taskA.createdAt) - Date.parse(taskB.createdAt);
            break;

          case "updatedAt":
            if (!taskA.updatedAt) {
              comparison = taskB.updatedAt ? 1 : 0;
              break;
            }

            if (!taskB.updatedAt) {
              comparison = -1;
              break;
            };

            comparison = Date.parse(taskA.updatedAt) - Date.parse(taskB.updatedAt);
            break;

          default:
            comparison = 0;
            break;
        }

        return comparison * direction;
      });
    }

    filteredTasks = filteredTasks.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: filteredTasks,
      page,
      limit,
      total: tasks.length,
    });
  },
);

tasksRouter.get<ParamsDictionary, ResponseBodyPaginated<TaskSchema>, any, TaskSearchQuerySchema>("/search", taskSearchQueryValidationMiddleware, (req, res) => {
  const { page, limit, startIndex, endIndex } = req.paginate();
  
  const { keyword } = req.query;

  let filteredTasks = structuredClone(tasks);

  if (keyword) {
    filteredTasks = filteredTasks.filter((task) => task.title.includes(keyword) || task.description?.includes(keyword));
  }

  filteredTasks = filteredTasks.slice(startIndex, endIndex);

  res.status(200).json({
    success: true,
    data: filteredTasks,
    page,
    limit,
    total: tasks.length,
  });
});

tasksRouter.get<TaskIdParamsSchema, ResponseBody<TaskSchema>, TaskSchema>("/:id", taskIdParamsValidationMiddleware, (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === id);
  const task = tasks[taskIndex];

  res.status(200).json({
    success: true,
    data: task
  });
});

tasksRouter.post<ParamsDictionary, ResponseBody<TaskSchema>, TaskCreateSchema>(
  "/",
  taskCreateBodyValidationMiddleware,
  (req, res) => {
    const creatingTask = req.body;
    const createdTask = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...creatingTask
    };

    tasks.push(createdTask);

    res.status(201).json({
      success: true,
      data: createdTask
    });
  }
);

tasksRouter.put<TaskIdParamsSchema, ResponseBody<TaskSchema>, TaskUpdateSchema>(
  "/:id",
  taskIdParamsValidationMiddleware,
  taskUpdateBodyValidationMiddleware,
  (req, res) => {
    const { id } = req.params;
    const updatingTask = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    const task = tasks[taskIndex];

    Object.assign(task, updatingTask);

    res.status(200).json({
      success: true,
      data: task
    });
  }
);

tasksRouter.patch<TaskIdParamsSchema, ResponseBody<TaskSchema>, TaskPartialUpdateSchema>(
  "/:id",
  taskIdParamsValidationMiddleware,
  taskPartialUpdateBodyValidationMiddleware,
  (req, res) => {
    const { id } = req.params;
    const partiallyUpdatingTask = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    const task = tasks[taskIndex];

    tasks[taskIndex] = {
      ...task,
      ...partiallyUpdatingTask
    };

    res.status(200).json({
      success: true,
      data: task
    });
  }
)

tasksRouter.delete<TaskIdParamsSchema, ResponseBody<TaskSchema>, any>(
  "/:id",
  taskIdParamsValidationMiddleware,
  (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    const deletedTasks = tasks.splice(taskIndex, 1);

    res.status(200).json({
      success: true,
      data: deletedTasks[0],
      message: `Task with ID "${id}" deleted`
    });
  }
);

tasksRouter.get<TaskAssigneeParamsSchema, ResponseBodyPaginated<TaskSchema>, any>(
  "/assignee/:assignee",
  taskAssigneeParamsValidationMiddleware,
  (req, res) => {
    const { assignee } = req.params;
    const { page, limit, startIndex, endIndex } = req.paginate();

    let filteredTasks = structuredClone(tasks);

    if (assignee) {
      filteredTasks = filteredTasks.filter((task) => task.assignee === assignee);
    }

    filteredTasks = filteredTasks.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: filteredTasks,
      page,
      limit,
      total: tasks.length,
    });
  }
);

tasksRouter.patch<TaskIdParamsSchema & TaskAssigneeParamsSchema, ResponseBody<TaskSchema>, any>(
  "/:id/assign/:assignee",
  taskIdParamsValidationMiddleware,
  assigneeParamsValidationMiddleware,
  (req, res) => {
    const { id, assignee } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    const task = tasks[taskIndex];

    Object.assign(task, {
      assignee
    });

    res.status(200).json({
      success: true,
      data: task
    });
  }
);

export default tasksRouter;