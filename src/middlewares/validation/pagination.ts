import type { RequestHandler } from "express";

import { validatePaginationQuery } from "#validators";

/**
 * Validate pagination request query params
 */
export const paginationValidationMiddleware: RequestHandler = (req, res, next) => {
  const result = validatePaginationQuery(req.query);

  if (!result?.success) {
    res.status(400).errors(result.error);

    next(result.error);
  }

  next();
};
