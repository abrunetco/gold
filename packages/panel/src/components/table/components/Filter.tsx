import { Header } from "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";
import { DatepickerInput, SelectInput, TextInput } from "components/fields";
import { useMongoRange, useMongoRegex } from "hooks/input";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { debounce } from "utils/debounce";

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
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "number" ? (
    <div className="flex flex-col">
      <RangeFilter header={header} />
    </div>
  ) : filterVariant === "date" ? (
    <DateRangeFilter header={header} />
  ) : filterVariant === "select" ? (
    <SelectFilter header={header} />
  ) : (
    <TextFilter header={header} />
  );
}

function RangeFilter<T>({ header }: FilterProps<T>) {
  const columnFilterValue = header.column.getFilterValue();
  const [[gte, lte], { setLte, setGte }] = useMongoRange(
    columnFilterValue,
    header.column.setFilterValue,
  );
  const onChangeGte = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setGte(+new Date(e.target.value));
    }),
    [setGte],
  );
  const onChangeLte = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setLte(+new Date(e.target.value));
    }),
    [setLte],
  );
  return (
    <>
      <TextInput
        placeholder={`فیلتر...`}
        type="number"
        sizing="sm"
        value={gte}
        onChange={onChangeGte}
        onClick={(e) => e.stopPropagation()}
      />
      <TextInput
        placeholder={`فیلتر...`}
        type="number"
        sizing="sm"
        value={lte}
        onChange={onChangeLte}
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
      placeholder={`فیلتر...`}
      sizing="sm"
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
  const onChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }),
    [setValue],
  );
  return (
    <TextInput
      placeholder={`فیلتر...`}
      type="text"
      sizing="sm"
      value={value}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

function SelectFilter<T>({ header }: FilterProps<T>) {
  const column = header.column;
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
