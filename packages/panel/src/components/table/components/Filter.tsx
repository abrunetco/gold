import { Column, RowData } from "@tanstack/react-table";
import { DatepickerInput, SelectInput, TextInput } from "components/fields";
import { useDebounced, useMongoDateRange, useMongoRegex } from "hooks/input";
import { useEffect, useMemo } from "react";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "number" | "select" | "date-range";
  }
}

interface FilterProps<T> {
  column: Column<T>;
}

export default function Filter<T>({ column }: FilterProps<T>) {
  const filterVariant = useMemo(
    () => column.columnDef.meta?.filterVariant,
    [column],
  );

  return filterVariant === "number" ? (
    <div className="flex flex-col">{/* <RangeFilter header={header} /> */}</div>
  ) : filterVariant === "date-range" ? (
    <DateRangeFilter column={column} />
  ) : filterVariant === "select" ? (
    <SelectFilter column={column} />
  ) : (
    <TextFilter column={column} />
  );
}

function DateRangeFilter<T>({ column }: FilterProps<T>) {
  const columnFilterValue = column.getFilterValue();
  const [filter, range, setRange] = useMongoDateRange(columnFilterValue as any);

  function submit() {
    column.setFilterValue(filter);
  }

  useEffect(submit, [filter]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DatepickerInput
        placeholder={`فیلتر...`}
        sizing="sm"
        range
        value={range}
        onChange={setRange}
        // onBlur={submit}
      />
    </div>
  );
}

function TextFilter<T>({ column }: FilterProps<T>) {
  const columnFilterValue = column.getFilterValue();
  const [filter, keyword, setKeyword] = useMongoRegex(columnFilterValue as any);
  const debouncedFilter = useDebounced(filter);
  useEffect(() => {
    column.setFilterValue(debouncedFilter);
  }, [debouncedFilter]);
  return (
    <TextInput
      placeholder={`فیلتر...`}
      type="text"
      sizing="sm"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

function SelectFilter<T>({ column }: FilterProps<T>) {
  const columnFilterValue = column.getFilterValue();
  const { options } = column.columnDef.meta ?? {};
  const _options = {
    "": "همه",
    ...options,
  };
  return (
    <SelectInput
      sizing="sm"
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      options={_options}
    />
  );
}
