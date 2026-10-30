import type { Query } from "express-serve-static-core";
import * as z from "zod/mini";

import { paginationQuerySchema, type PaginationQuerySchema } from "#schema";

export function validatePaginationQuery(query: Query): z.core.util.SafeParseResult<PaginationQuerySchema> {
  const result = paginationQuerySchema.safeParse(query);

  return result;
}

export async function validatePaginationQueryAsync(query: Query): Promise<z.core.util.SafeParseResult<PaginationQuerySchema>> {
  const result = await paginationQuerySchema.safeParseAsync(query);

  return result;
}