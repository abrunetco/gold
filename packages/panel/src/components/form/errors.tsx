import { ReactNode } from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

interface FieldError<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TFieldName;
  about?: ReactNode;
}

export function FieldErrorMessage<T>({ about, name }: FieldError<T>) {
  const {
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name] as any;
  // console.log("[error]", name, error);

  if (error) {
    if (error.message && typeof error.message === "string")
      return <p className="w-full text-sm text-red-700">{error.message}</p>;

    console.log("complex error on", name, error);
    return <p className="w-full text-sm text-red-700">{error.type}</p>;
  }
  return <p className="w-full text-sm text-gray-600">{about}&nbsp;</p>;
}
