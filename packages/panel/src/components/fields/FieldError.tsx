import { type FieldError } from "react-hook-form";


export function FieldError(props: FieldError) {
  return (
    <span>{props.message}</span>
  )
}