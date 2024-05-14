import { type ClassValue, clsx } from "clsx";
import { Width } from "switch/types";
import { twMerge } from "tailwind-merge";

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
    case "quarter":
      return "w-1/4";
    case "short":
      return "w-[75px]";

    default:
      return undefined;
  }
}
