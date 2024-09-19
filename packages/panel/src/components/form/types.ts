import { EntityName } from "@gold/api";
import { type TextInputProps } from "flowbite-react";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  FieldValues,
  FieldPath,
  RegisterOptions,
  Control,
  UseFormRegister,
} from "react-hook-form";

export interface GenericFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Pick<
    TextInputProps,
    | "id"
    | "disabled"
    | "className"
    | "icon"
    | "rightIcon"
    | "addon"
    | "about"
    | "children"
  > {
  inline?: true;
  name: TFieldName;
  service?: EntityName;
  options?: Record<string, ReactNode>;
  type?:
    | HTMLInputTypeAttribute
    | "textarea"
    | "select"
    | "datetime"
    | "btngroup"
    | "remote"
    | "switch";
  rules?: RegisterOptions<TFieldValues, TFieldName>;
}

export interface ControledFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends GenericFieldProps<TFieldValues, TFieldName> {
  id: string;
  control: Control<TFieldValues, TFieldName>;
}

export interface UnControledFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends GenericFieldProps<TFieldValues, TFieldName> {
  id: string;
  register: UseFormRegister<TFieldValues>;
}
