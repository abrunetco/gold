import { PropsWithChildren } from "react";
import { type FieldError } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FieldMetaProps extends FieldError {

}

export function FieldMeta(props: PropsWithChildren<FieldError>) {
  return (
    <span>{props.message ?? props.children}</span>
  )
}