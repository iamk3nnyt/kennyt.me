import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @see https://github.com/typehero/typehero/blob/main/packages/ui/src/cn.ts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
