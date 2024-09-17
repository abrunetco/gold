import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { FieldLabel } from "./label";
import { fieldsetTV } from "./variant";

export interface FieldsetProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  htmlFor?: string;
}

export function Fieldset(props: PropsWithChildren<FieldsetProps>) {
  const { children, label, htmlFor, className, ...attributes } = props;

  const cls = fieldsetTV({ className });

  return (
    <div {...attributes} className={cls}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      {children}
    </div>
  );
}
