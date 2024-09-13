import { ReactNode, SelectHTMLAttributes } from "react";
import { selectTV, SelectVariantProps } from "./variant";

type ExternalInputVariantProps = Omit<SelectVariantProps, "">;

export interface SelectInputProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: [string, ReactNode][];
}

export function SelectInput(
  props: SelectInputProps & ExternalInputVariantProps,
) {
  const { className, severity, size, options, ...field } = props;
  const { disabled } = field;
  const cls = selectTV({ disabled: disabled, severity, size, className });

  return (
    <select className={cls}>
      {options.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
