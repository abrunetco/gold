import { CellContext, RowData } from "@tanstack/react-table";
import { Button } from "components/button";
import { ReactNode } from "react";
import { BsFolder2Open } from "react-icons/bs";
import { NavLink } from "react-router-dom";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    options?: { [k: string]: ReactNode };
    format?: "date" | "currency";
  }
}

interface RowControlsProps<TData, TValue> {
  context: CellContext<TData, TValue>;
  accessor: string;
}

export default function RowControls<TData, TValue extends ReactNode>({
  context,
}: RowControlsProps<TData, TValue>) {
  // const navigate = useNavigate();
  const uid = String(context.getValue());
  return (
    <span className="flex gap-2">
      <NavLink to={`/admin/user/${uid}`}>
        <Button size="xs" color="light">
          <BsFolder2Open />
        </Button>
      </NavLink>
    </span>
  );
}
