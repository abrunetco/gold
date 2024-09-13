import { Header } from "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";
import {
  DatepickerInput,
  DebouncedTextInput,
  SelectInput,
} from "components/fields";
import { useMongoRange, useMongoRegex } from "hooks/input";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";

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
  const { filterVariant, options } = column.columnDef.meta ?? {};

  return filterVariant === "number" ? (
    <div className="flex flex-col">
      <RangeFilter header={header} />
    </div>
  ) : filterVariant === "date" ? (
    <DateRangeFilter header={header} />
  ) : filterVariant === "select" && options ? (
    <SelectFilter header={header} />
  ) : filterVariant === "select" ? (
    <div>
      {/* <select
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        <option value="">All</option>
        <option value="complicated">complicated</option>
        <option value="relationship">relationship</option>
        <option value="single">single</option>
      </select> */}
      <div>ssss</div>
    </div>
  ) : (
    <TextFilter header={header} />
  );
}

function RangeFilter<T>({ header }: FilterProps<T>) {
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
        type="number"
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
        type="number"
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DateRangeFilter<T>({ header }: FilterProps<T>) {
  // const columnFilterValue = header.column.getFilterValue();

  const [values, setValues] = useState<
    [DateObject | undefined, DateObject | undefined] | undefined
  >([undefined, undefined]);

  useEffect(() => {
    console.log("DateRangeFilter", values);
  }, [values]);
  return (
    <DatepickerInput
      className="w-full rounded border shadow"
      placeholder={`فیلتر...`}
      size="sm"
      range
      value={values}
      onChange={setValues as any}
      onClick={(e) => e.stopPropagation()}
    />
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

function SelectFilter<T>({ header }: FilterProps<T>) {
  const column = header.column;
  const columnFilterValue = column.getFilterValue();
  const { options: _options = {} } = column.columnDef.meta ?? {};
  const options = Object.entries(_options).filter(([k]) => k !== "default");
  return (
    <SelectInput
      className="w-full rounded border shadow"
      size="sm"
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      options={[["", "همه"], ...options]}
    />
  );
}
