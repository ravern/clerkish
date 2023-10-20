export const config = {};

function required<T>(envVar: T | undefined): T {
  if (!envVar) {
    throw new Error("Missing env var!");
  }
  return envVar;
}
