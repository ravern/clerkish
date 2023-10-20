export type MaybeClassName = string | undefined | null | false;

export function cn(...classNames: MaybeClassName[]) {
  return classNames.join(" ");
}
