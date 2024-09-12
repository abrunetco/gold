import { InputHTMLAttributes } from 'react';
import { checkboxTV, CheckboxVariantProps } from './variant';

type ExternalCheckboxVariantProps = Omit<CheckboxVariantProps, ''>

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>

export function CheckboxInput(props: CheckboxProps & ExternalCheckboxVariantProps) {
  const { className, severity, ...field } = props;
  const { disabled } = field
  const cls = checkboxTV({ disabled: disabled, severity, className })
  return (
    <input
      type="checkbox"
      className={cls}
      {...field}
    />
  )
}

