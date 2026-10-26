import { Router } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import {
    SORTATION_TASK_PRIORITY_ORDER,
    SORTATION_TASK_STATUS_ORDER,
    TASK_UNASSIGNED_ASSIGNEE
} from "#constants";
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
import { TasksLowDBRepository } from "#repositories";
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
  async (req, res) => {
    const { title, description, status, priority, assignee, sort = "title", order = "asc" } = req.query;
    const { page, limit, startIndex, endIndex } = req.paginate();

    const repository = await TasksLowDBRepository.open();
    // const repository = TasksFileSystemRepository.open();
    const tasks = await repository.getAllAsync();

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

tasksRouter.get<ParamsDictionary, ResponseBodyPaginated<TaskSchema>, any, TaskSearchQuerySchema>("/search", taskSearchQueryValidationMiddleware, async (req, res) => {
  const { page, limit, startIndex, endIndex } = req.paginate();
  
  const { keyword } = req.query;
  
  const repository = await TasksLowDBRepository.open();
  // const repository = TasksFileSystemRepository.open();
  const tasks = await repository.getAllAsync();

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

tasksRouter.get<TaskIdParamsSchema, ResponseBody<TaskSchema | null>, TaskSchema>("/:id", taskIdParamsValidationMiddleware, async (req, res) => {
  const { id } = req.params;

  const repository = await TasksLowDBRepository.open();
  // const repository = TasksFileSystemRepository.open();
  const task = await repository.getByIdAsync(id);

  res.status(200).json({
    success: true,
    data: task ?? null
  });
});

tasksRouter.post<ParamsDictionary, ResponseBody<TaskSchema>, TaskCreateSchema>(
  "/",
  taskCreateBodyValidationMiddleware,
  async (req, res) => {
    const creatingTask = req.body;

    await using repository = await TasksLowDBRepository.open();
    // await using repository = TasksFileSystemRepository.open();
    const createdTask = await repository.createAsync(creatingTask);

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
  async (req, res) => {
    const { id } = req.params;
    const updatingTask = req.body;

    await using repository = await TasksLowDBRepository.open();
    // await using repository = TasksFileSystemRepository.open();
    const updatedTask = await repository.updateAsync(id, updatingTask);

    res.status(200).json({
      success: true,
      data: updatedTask
    });
  }
);

tasksRouter.patch<TaskIdParamsSchema, ResponseBody<TaskSchema>, TaskPartialUpdateSchema>(
  "/:id",
  taskIdParamsValidationMiddleware,
  taskPartialUpdateBodyValidationMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const partiallyUpdatingTask = req.body;

    await using repository = await TasksLowDBRepository.open();
    // await using repository = TasksFileSystemRepository.open();
    const partiallyUpdatedTask = await repository.partialUpdateAsync(id, partiallyUpdatingTask);

    res.status(200).json({
      success: true,
      data: partiallyUpdatedTask
    });
  }
)

tasksRouter.delete<TaskIdParamsSchema, ResponseBody<TaskSchema>, any>(
  "/:id",
  taskIdParamsValidationMiddleware,
  async (req, res) => {
    const { id } = req.params;

    await using repository = await TasksLowDBRepository.open();
    // await using repository = TasksFileSystemRepository.open();
    const deletedTask = await repository.deleteAsync(id);

    res.status(200).json({
      success: true,
      data: deletedTask,
      message: `Task with ID "${id}" deleted`
    });
  }
);

tasksRouter.get<TaskAssigneeParamsSchema, ResponseBodyPaginated<TaskSchema>, any>(
  "/assignee/:assignee",
  taskAssigneeParamsValidationMiddleware,
  async (req, res) => {
    const { assignee } = req.params;
    const { page, limit, startIndex, endIndex } = req.paginate();

    const repository = await TasksLowDBRepository.open();
    // const repository = TasksFileSystemRepository.open();
    const tasks = await repository.getAllAsync();

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
  async (req, res) => {
    const { id, assignee } = req.params;

    await using repository = await TasksLowDBRepository.open();
    // await using repository = TasksFileSystemRepository.open();
    const assignedTask = await repository.assignAsync(id, assignee);

    res.status(200).json({
      success: true,
      data: assignedTask
    });
  }
);

export default tasksRouter;