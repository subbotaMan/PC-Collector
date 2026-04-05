import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Утилита для мержа tailwind классов.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Утилита для определения табов.
type TabValueType = "dashboard" | "explore" | "builds" | undefined;

export function getTabValue(pathname: string): TabValueType {
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
    return "dashboard";

  if (pathname === "/builds/explore" || pathname.startsWith("/builds/explore"))
    return "explore";

  if (pathname === "/builds" || pathname.startsWith("/builds")) return "builds";

  return;
}
