import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...inputs: clsx.ClassValue[]) {
  return twMerge(clsx(...inputs));
}
