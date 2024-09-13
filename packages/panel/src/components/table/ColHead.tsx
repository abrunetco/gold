import { HeaderContext } from "@tanstack/react-table";
import { ReactNode } from "react";

interface ColHeadProps<TData, TValue> {
  context: HeaderContext<TData, TValue>;
  title: string;
}

export default function ColHead<TData, TValue extends ReactNode>({
  title,
}: ColHeadProps<TData, TValue>) {
  return (
    <span className="w-full flex-1 overflow-hidden overflow-ellipsis font-bold">
      {title}
    </span>
  );
}
