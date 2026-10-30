import * as z from "zod/mini";

declare global {
  namespace Express {
    interface Response {
      /**
       * Send formatted {@link z zod} errors to JSON response.
       *
       * @example
       * ```ts
       * res.errors(result.error); // => res.json({ errors: [<zod error message>] });
       * res.status(500).errors(result.error); // => res.status(500).json({ success: false, errors: [<zod error message>] })
       * res.status(404).errors(result.error); // => res.status(400).json({ success: false, errors: [<zod error message>] })
       * ```
       */
      errors<T = unknown>(zodError: z.core.$ZodError<T>): this;
    }
  }
}
