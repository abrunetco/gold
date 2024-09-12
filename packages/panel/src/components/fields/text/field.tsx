import { PropsWithChildren, ReactNode, useId } from 'react';
import { CommonFieldset } from '../common/fieldset';
import { BaseFieldVariants } from '../type';
import { InputProps, TextInput, TextareaInput, TextareaProps } from './input';

export interface TextFieldProps extends InputProps, BaseFieldVariants {
  label?: ReactNode
}

export function TextField(props: PropsWithChildren<TextFieldProps>) {
  const id2 = useId()
  const { children, label, className, variant, severity, size, ...field } = props;
  const variantProps = { variant, severity, size }

  return (
    <CommonFieldset label={label} className={className} htmlFor={props.id ?? id2} {...variantProps}>
      <TextInput
        {...variantProps}
        {...field}
        id={props.id ?? id2}
      />
      {children}
    </CommonFieldset>
  );
}

export interface TextareaFieldProps extends TextareaProps, BaseFieldVariants {
  label?: ReactNode
}

export function TextareaField(props: PropsWithChildren<TextareaFieldProps>) {
  const id2 = useId()
  const { children, label, className, variant, severity, size, ...field } = props;
  const variantProps = { variant, severity, size }

  return (
    <CommonFieldset label={label} className={className} htmlFor={props.id ?? id2} {...variantProps}>
      <TextareaInput
        {...variantProps}
        {...field}
        id={props.id ?? id2}
      />
      {children}
    </CommonFieldset>
  );
}

