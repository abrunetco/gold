import { useDebounce } from "hooks/input";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { inputTV, InputVariantProps } from "./variant";

type ExternalInputVariantProps = Omit<InputVariantProps, "">;

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export function TextInput(props: InputProps & ExternalInputVariantProps) {
  const { type = "text", className, severity, size, ...field } = props;
  const { disabled } = field;
  const cls = inputTV({ disabled: disabled, severity, size, className });
  return <input type={type} className={cls} {...field} />;
}

interface DebounceProps {
  debounce?: number;
  onValueChange?: (v: string | number) => void;
}

export function DebouncedTextInput(
  props: InputProps & ExternalInputVariantProps & DebounceProps,
) {
  const { debounce = 500, onValueChange, ...field } = props;
  const [value, setValue] = useDebounce(
    String(props.value ?? ""),
    onValueChange,
    debounce,
  );
  return (
    <TextInput
      {...field}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
>;

export function TextareaInput(
  props: TextareaProps & ExternalInputVariantProps,
) {
  const { className, severity, size, ...field } = props;
  const { disabled } = field;
  const cls = inputTV({ disabled: disabled, severity, size, className });
  return <textarea className={cls} {...field} />;
}
