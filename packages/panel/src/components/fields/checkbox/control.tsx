import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { FieldMeta } from "../common/meta";
import { CheckboxField, CheckboxFieldProps } from "./field";
import { ReactNode } from "react";

interface CheckboxFieldControlProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> extends CheckboxFieldProps {
  label?: ReactNode;
  multiline?: true;
  renderProps: {
    field: ControllerRenderProps<T, N>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  };
}

export function CheckboxFieldControl<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>(props: CheckboxFieldControlProps<T, N>) {
  const { renderProps, ...rest } = props;
  const { fieldState, field } = renderProps;
  const { invalid, isDirty, isTouched, error } = fieldState;
  const severity = invalid
    ? "error"
    : isDirty && isTouched
      ? "success"
      : "default";

  return (
    <CheckboxField {...rest} {...field} severity={severity}>
      <FieldMeta {...error} />
    </CheckboxField>
  );
}
