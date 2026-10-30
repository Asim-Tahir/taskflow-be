import type { ErrorRequestHandler } from "express";

import { logger } from "#utils";

/**
 * General error middleware
 */
const errorMiddleware: ErrorRequestHandler = (err: Error, _req, res, next) => {
  logger.error(err.stack);

  res.status(500).json({
    error: "Internal Server Error",
  });

  next(err);
};

export default errorMiddleware;
