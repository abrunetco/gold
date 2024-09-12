import { LabelHTMLAttributes, PropsWithChildren } from "react";
import { labelTV, type LabelVariantProps } from "./variant";
import { log } from "console";

export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function FieldLabel (props: PropsWithChildren<FieldLabelProps & LabelVariantProps>) {
  const { children, htmlFor, className, ...variant } = props;
  const cls = labelTV({ ...variant, className })
  
  return (
    <label htmlFor={htmlFor} className={cls}>{children}</label>
  );
}