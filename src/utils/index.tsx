export function assignForm<T extends Record<string, any>>(
  target: T,
  source?: Partial<T> | null
) {
  if (!source) return

  for (const key of Object.keys(target) as Array<keyof T>) {
    if (key in source) {
      target[key] = source[key] as T[typeof key]
    }
  }
}