import * as z from "zod/mini";

import { paginationQuerySchema, type PaginationQuerySchema } from "#schema";

export function validatePaginationQuery(query: object): z.core.util.SafeParseResult<PaginationQuerySchema> {
  const result = paginationQuerySchema.safeParse(query);

  return result;
}

export async function validatePaginationQueryAsync(query: object): Promise<z.core.util.SafeParseResult<PaginationQuerySchema>> {
  const result = await paginationQuerySchema.safeParseAsync(query);

  return result;
}