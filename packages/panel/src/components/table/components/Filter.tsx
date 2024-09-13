import { Header } from "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";
import { DebouncedTextInput } from "components/fields";
import { useMongoRange, useMongoRegex } from "hooks/input";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "number" | "select" | "date";
  }
}

interface FilterProps<T> {
  header: Header<T, unknown>;
}

export default function Filter<T>({ header }: FilterProps<T>) {
  const column = header.column;
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, options } = column.columnDef.meta ?? {};

  return filterVariant === "number" ? (
    <div className="flex space-x-2">
      <RangeFilter type="number" header={header} />
    </div>
  ) : filterVariant === "date" ? (
    <div className="flex space-x-2">
      <RangeFilter type="date" header={header} />
    </div>
  ) : filterVariant === "select" && options ? (
    <EnumFilter header={header} />
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <TextFilter header={header} />
  );
}

function RangeFilter<T>({
  header,
  type,
}: FilterProps<T> & { type: "number" | "date" }) {
  const columnFilterValue = header.column.getFilterValue();
  const { lte, setLte, gte, setGte } = useMongoRange(
    columnFilterValue as any,
    header.column.setFilterValue,
  );
  return (
    <>
      <DebouncedTextInput
        className="w-full rounded border shadow"
        placeholder={`فیلتر...`}
        type={type}
        size="sm"
        value={lte}
        onValueChange={(v) => {
          console.log("on lte change", v, +new Date(v));

          setLte(+new Date(v));
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <DebouncedTextInput
        className="w-full rounded border shadow"
        placeholder={`فیلتر...`}
        type={type}
        size="sm"
        value={gte}
        onValueChange={(v) => {
          console.log("on gte change", v, +new Date(v));

          setGte(+new Date(v));
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </>
  );
}

function TextFilter<T>({ header }: FilterProps<T>) {
  const columnFilterValue = header.column.getFilterValue();
  const [value, setValue] = useMongoRegex(
    columnFilterValue as any,
    header.column.setFilterValue,
  );
  return (
    <DebouncedTextInput
      className="w-full rounded border shadow"
      placeholder={`فیلتر...`}
      type="text"
      size="sm"
      value={value}
      onValueChange={(v) => setValue(String(v))}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

function EnumFilter<T>({ header }: FilterProps<T>) {
  const column = header.column;
  const columnFilterValue = column.getFilterValue();
  const { options: _options = {} } = column.columnDef.meta ?? {};
  const options = Object.entries(_options).filter(([k]) => k !== "default");
  return (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">همه</option>
      {options.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
