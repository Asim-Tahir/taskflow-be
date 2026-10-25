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
    read: (v: any) => v === "true",
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => (v as Date).toISOString(),
  },
};
