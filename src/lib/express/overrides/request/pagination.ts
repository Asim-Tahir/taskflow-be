import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_MAX_LIMIT,
  PAGINATION_MAX_PAGE,
  PAGINATION_MIN_LIMIT,
  PAGINATION_MIN_PAGE
} from "#constants";
import type { PaginationQuerySchema } from "#schema";
import { validatePaginationQuery } from "#validators";

import type { Request } from "express";

export function paginate(
  this: Request<Express.Pagination.Params, any, any, PaginationQuerySchema>,
  options: Express.Pagination.Options = {
    min: {
      limit: PAGINATION_MIN_LIMIT,
      page: PAGINATION_MIN_PAGE
    },
    max: {
      limit: PAGINATION_MAX_LIMIT,
      page: PAGINATION_MAX_PAGE
    }
  }
): Express.Pagination.PageInfo {
  const { min, max } = options;

  const result = validatePaginationQuery(this.query);

  if (!result.success) {
    return {
      page: PAGINATION_DEFAULT_PAGE,
      limit: PAGINATION_DEFAULT_LIMIT,
      startIndex: 0,
      endIndex: PAGINATION_DEFAULT_LIMIT
    };
  }

  const {
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT
  } = result.data;

  const pageMin = min?.page ?? PAGINATION_MIN_PAGE;
  const pageMax = max?.page ?? PAGINATION_MAX_PAGE;

  const limitMin = min?.limit ?? PAGINATION_MIN_LIMIT;
  const limitMax = max?.limit ?? PAGINATION_MAX_LIMIT;

  const safePage = Math.min(pageMax, Math.max(pageMin, page));
  const safeLimit = Math.min(limitMax, Math.max(limitMin, limit));

  const startIndex = (safePage - 1) * safeLimit;
  const endIndex = startIndex + safeLimit;

  return {
    page: safePage,
    limit: safeLimit,
    startIndex,
    endIndex,
  }
}
