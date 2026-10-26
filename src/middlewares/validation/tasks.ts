import type { RequestHandler } from "express";

import { TasksLowDBRepository } from "#repositories";
import {
  validateTaskAssigneeParams,
  validateTaskCreate,
  validateTaskFilterQuery,
  validateTaskIdParams,
  validateTaskPartialUpdate,
  validateTaskReportsStatusParams,
  validateTaskSearchQuery,
  validateTaskSortationQuery,
  validateTaskUpdate
} from "#validators";

const repository = await TasksLowDBRepository.open();

/**
 * Validate task filters at request query
 */
export const taskFilterQueryValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskFilterQuery(req.query);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
};

/**
 * Validate task sortation request query
 */
export const taskSortationQueryValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskSortationQuery(req.query);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
};

/**
 * Validate task search request query
 */
export const taskSearchQueryValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskSearchQuery(req.query);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
}

/**
 * Validate task id request params
 */
export const taskIdParamsValidationMiddleware: RequestHandler = async (req, res, next) => {
  const result = validateTaskIdParams(req.params);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  const { id } = result.data;
  const task = await repository.getByIdAsync(id);

  if (!task) {
    res.status(404).json({
      success: false,
      errors: [`Task with ID ${id} not found`]
    });
    return;
  }

  next();
}

/**
 * Validate task assignee request params
 */
export const taskAssigneeParamsValidationMiddleware: RequestHandler = async (req, res, next) => {
  const result = validateTaskAssigneeParams(req.params);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  const { assignee } = result.data;
  const assigneeTasks = await repository.getAllByAssigneeAsync(assignee);

  if (assigneeTasks.length <= 0) {
    res.status(404).json({
      success: false,
      errors: [`Task with assignee "${assignee}" not found`]
    });
    return;
  }

  next();
}

/**
 * Validate assignee request params
 */
export const assigneeParamsValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskAssigneeParams(req.params);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
}

/**
 * Validate task create request body
 */
export const taskCreateBodyValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskCreate(req.body);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
}

/**
 * Validate task update request body
 */
export const taskUpdateBodyValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskUpdate(req.body);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
}

/**
 * Validate task partial update request body
 */
export const taskPartialUpdateBodyValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskPartialUpdate(req.body);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
}

/**
 * Validate task reports summary request params
 */
export const taskReportsStatusParamsValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validateTaskReportsStatusParams(req.params);

  if (!result?.success) {
    res.status(400).errors(result.error);
    return;
  }

  next();
}
