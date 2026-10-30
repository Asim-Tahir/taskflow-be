import * as z from "zod/mini";

export const baseEntitySchema = z.object({
  id: z.uuidv4(),
  createdAt: z.iso.datetime(),
  updatedAt: z.optional(z.iso.datetime()),
});

export type BaseEntitySchema = z.infer<typeof baseEntitySchema>;
