import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues, UseFormStateReturn } from 'react-hook-form';
import { FieldMeta } from '../common/meta';
import { TextareaField, TextareaFieldProps, TextField, TextFieldProps } from './field';
import { ReactNode } from 'react';


interface TextFieldControlProps<T extends FieldValues = FieldValues, N extends FieldPath<T> = FieldPath<T>> extends TextFieldProps {
  label?: ReactNode
  multiline?: true
  renderProps: {
    field: ControllerRenderProps<T, N>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<T>
  }
}

export function TextFieldControl<T extends FieldValues = FieldValues, N extends FieldPath<T> = FieldPath<T>>
  (props: TextFieldControlProps<T, N>) {
  const { multiline, type = 'text', renderProps, ...rest } = props;
  const { fieldState, field } = renderProps;
  const { invalid, isDirty, isTouched, isValidating, error } = fieldState;
  const severity = invalid ? 'error' : isDirty && isTouched ? "success" : "default"

  if(!multiline) return (
    <TextField type={type} {...rest} {...field} severity={severity}>
      <FieldMeta {...error} />
    </TextField>
  )
  return (
    <TextareaField
      {...rest as unknown as TextareaFieldProps}
      {...field}
      severity={severity}
    >
      <FieldMeta {...error} />
    </TextareaField>
  )
}

