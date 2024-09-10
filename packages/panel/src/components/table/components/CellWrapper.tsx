import { PropsWithChildren } from "react";

export default function CellWrapper({ children}: PropsWithChildren) {
  return (
    <p className="text-sm font-bold text-navy-700 dark:text-white">
      {children}
    </p>
    )
}