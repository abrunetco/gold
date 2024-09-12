import { PropsWithChildren, ReactNode, useId } from 'react';
import { CommonFieldset } from '../common/fieldset';
import { BaseFieldVariants } from '../type';
import { CheckboxProps, CheckboxInput } from './input';

export interface CheckboxFieldProps extends CheckboxProps, BaseFieldVariants {
  label?: ReactNode
}

export function CheckboxField(props: PropsWithChildren<CheckboxFieldProps>) {
  const id2 = useId()
  const { children, label, className, variant, severity, size, ...field } = props;
  const variantProps = { variant, severity, size }

  return (
    <CommonFieldset label={label} className={className} htmlFor={props.id ?? id2} {...variantProps}>
      <CheckboxInput
        {...variantProps}
        {...field}
        id={props.id ?? id2}
      />
      {children}
    </CommonFieldset>
  );
}

