type PlainObject = Record<string, unknown>;

export type DeepPartial<T> = T extends readonly (infer Item)[]
  ? Item[]
  : T extends object
    ? { [Key in keyof T]?: DeepPartial<T[Key]> }
    : T;

function isPlainObject(value: unknown): value is PlainObject {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  if (Array.isArray(base) || Array.isArray(override)) {
    const source: unknown[] = Array.isArray(override)
      ? override
      : Array.isArray(base)
        ? base
        : [];
    return source.slice() as T;
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : override) as T;
  }

  const merged: PlainObject = { ...base };
  for (const [key, overrideValue] of Object.entries(override)) {
    const baseValue = merged[key];
    merged[key] =
      baseValue !== undefined && overrideValue !== undefined
        ? deepMerge(baseValue, overrideValue)
        : overrideValue;
  }

  return merged as T;
}
