import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { BaseFieldVariants } from '../type';
import { FieldLabel } from './label';
import { fieldsetTV } from './variant';

export interface FieldsetProps extends HTMLAttributes<HTMLDivElement>, BaseFieldVariants {
  label?: ReactNode
  htmlFor?: string
}

export function CommonFieldset(props: PropsWithChildren<FieldsetProps>) {
  const { children, label, htmlFor, variant, severity, size, className, ...attributes } = props;

  const variantProps = { variant, severity, size }

  const cls = fieldsetTV({ ...variantProps, className })

  return (
    <div {...attributes} className={cls}>
      <FieldLabel htmlFor={htmlFor} {...variantProps}>
        {label}
      </FieldLabel>
      {children}
    </div>
  );
}

