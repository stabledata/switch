import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Width } from "../types.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function widthToClassName(w: Width) {
  switch (w) {
    case "full":
      return "w-full";
    case "half":
      return "w-1/2";
    case "third":
      return "w-1/3";
    case "two-thirds":
      return "w-2/3";
    case "quarter":
      return "w-1/4";
    case "three-quarters":
      return "w-3/4";
    case "short":
      return "w-[75px]";

    default:
      return undefined;
  }
}
