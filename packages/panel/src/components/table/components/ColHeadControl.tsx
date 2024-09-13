import { flexRender, Header } from "@tanstack/react-table";
import Filter from "./Filter";
import { CommonFieldset } from "components/fields";
import Icon from "components/icons";

interface ColHeadControlProps<T> {
  header: Header<T, unknown>;
}

const sortIcons = {
  asc: <Icon name="SortAsc" />,
  desc: <Icon name="SortDesc" />,
};

export default function ColHeadControl<T>({ header }: ColHeadControlProps<T>) {
  const textLabel = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );
  const canSort = header.column.getCanSort();
  const isSorted = header.column.getIsSorted();
  const label = canSort ? (
    <button
      onClick={header.column.getToggleSortingHandler()}
      className="flex items-center gap-2"
    >
      <span>{textLabel}</span>
      {isSorted && sortIcons[isSorted]}
    </button>
  ) : (
    textLabel
  );
  return (
    <div className="flex flex-1 flex-col">
      <CommonFieldset
        label={label}
        htmlFor={header.id}
        variant={isSorted ? "th" : undefined}
      >
        {header.column.getCanFilter() ? <Filter header={header} /> : null}
      </CommonFieldset>
    </div>
  );
}
