import { PropsWithChildren } from "react";

export default function ColumnHeaderLable({ children }: PropsWithChildren) {
  return <p className="text-sm font-bold text-gray-600 dark:text-white">{children}</p>
}