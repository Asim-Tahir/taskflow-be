/**
 * Defines how a value is parsed from and serialized to a string.
 *
 * @example
 * ```ts
 * const urlSerializer: Serializer<URL> = {
 *   read: (raw) => new URL(raw),
 *   write: (value) => value.toString(),
 * };
 * ```
 */
export interface Serializer<T> {
  read: (raw: string) => T;
  write: (value: T) => string;
}

/**
 * Built-in serializers for primitive values and common collections.
 *
 * @example
 * ```ts
 * const count = Serializers.number.read("42");
 * const raw = Serializers.number.write(99);
 * ```
 */
export const Serializers: Record<
  "boolean" | "object" | "number" | "any" | "string" | "map" | "set" | "date",
  Serializer<any>
> = {
  boolean: {
    read: (v: string) => v === "true",
    write: (v: boolean) => String(v),
  },
  object: {
    read: (v: string) => JSON.parse(v),
    write: (v: object) => JSON.stringify(v),
  },
  number: {
    read: (v: string) => Number.parseFloat(v),
    write: (v: number) => String(v),
  },
  any: {
    read: (v: string) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: string) => v,
    write: (v: string) => v,
  },
  map: {
    read: (v: string) => new Map(JSON.parse(v)),
    write: (v: Map<any, any>) => JSON.stringify(Array.from(v.entries())),
  },
  set: {
    read: (v: string) => new Set(JSON.parse(v)),
    write: (v: Set<any>) => JSON.stringify(Array.from(v)),
  },
  date: {
    read: (v: string) => new Date(v),
    write: (v: Date) => v.toISOString(),
  },
};
