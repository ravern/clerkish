export function doesArrayIncludeArray(array: string[], includeArray: string[]) {
  const set = new Set(array);

  const originalSize = set.size;
  for (const item of includeArray) {
    set.add(item);
    if (set.size > originalSize) {
      return false;
    }
  }

  return true;
}
