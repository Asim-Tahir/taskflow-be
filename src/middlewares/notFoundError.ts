import type { RequestHandler } from "express";

/**
 * Not found(`404`) error middleware
 */
const notFoundErrorMiddleware: RequestHandler = (_req, res, _next) => {
  res.status(404).json({ error: "Not Found" });
};

export default notFoundErrorMiddleware;
