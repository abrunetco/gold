import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { FieldMeta } from "../common/meta";
import { SelectField, SelectFieldProps } from "./field";
import { ReactNode } from "react";

interface SelectFieldControlProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> extends SelectFieldProps {
  label?: ReactNode;
  multi?: true;
  renderProps: {
    field: ControllerRenderProps<T, N>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  };
}

export function SelectFieldControl<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>(props: SelectFieldControlProps<T, N>) {
  const { multi, renderProps, ...rest } = props;
  const { fieldState, field } = renderProps;
  const { invalid, isDirty, isTouched, error } = fieldState;
  const severity = invalid
    ? "error"
    : isDirty && isTouched
      ? "success"
      : "default";

  if (!multi)
    return (
      <SelectField {...rest} {...field} severity={severity}>
        <FieldMeta {...error} />
      </SelectField>
    );
  return (
    <SelectField
      {...(rest as unknown as SelectFieldProps)}
      {...field}
      severity={severity}
    >
      <FieldMeta {...error} />
    </SelectField>
  );
}
