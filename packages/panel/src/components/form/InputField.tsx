import { ReactNode, useCallback, useId, useMemo } from "react";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { ControledFieldProps, GenericFieldProps } from "./types";
import {
  TextareaInput,
  SelectInput,
  TextInput,
  DatepickerInput,
  CheckboxInput,
  FieldLabel,
  SwitchInput,
  RadioInput,
  BtnGroupInput,
} from "components/fields";
import { DateObject } from "react-multi-date-picker";
import { fieldsetTV } from "components/fields/variant";
import { FieldErrorMessage } from "./errors";

function useCtrlAttrs<T extends FieldValues>(
  deps: ControledFieldProps<T>,
  config?: ControledFieldProps<T>["rules"],
) {
  const { control, rules: r, name, disabled, ...props } = deps;
  const rules = { ...r, config };
  const ctrl = useController({ name, control, rules, disabled });
  const { field, fieldState } = ctrl;
  const { invalid, isDirty, isTouched } = fieldState;
  const color = isTouched && isDirty ? (invalid ? "failure" : "success") : "";
  return { name, disabled, color, ...props, ...field };
}

function useTextInputFieldExtras<T extends FieldValues>(
  deps: ControledFieldProps<T>,
): ControledFieldProps<T>["rules"] {
  if (deps.type === "number") return { valueAsNumber: true };
  return {};
}

function TextInputField<T extends FieldValues>(props: ControledFieldProps<T>) {
  const deps = useTextInputFieldExtras(props);
  const attrs = useCtrlAttrs(props, deps);
  return <TextInput {...attrs} />;
}

function CheckboxInputField<T extends FieldValues>(
  props: ControledFieldProps<T>,
) {
  const attrs = useCtrlAttrs(props);
  const { setValue } = useFormContext<T>();
  return (
    <CheckboxInput
      {...attrs}
      checked={attrs.value}
      onChange={(v) => setValue(attrs.name, v.target.checked as any)}
      onBlur={(v) => setValue(attrs.name, v.target.checked as any)}
    />
  );
}

function SwitchInputField<T extends FieldValues>(
  props: ControledFieldProps<T>,
) {
  const attrs = useCtrlAttrs(props);
  const { setValue } = useFormContext<T>();
  return (
    <SwitchInput
      {...attrs}
      type="button"
      checked={attrs.value}
      onChange={(v) => setValue(attrs.name, v as any)}
    />
  );
}

function TextareaInputField<T extends FieldValues>(
  props: ControledFieldProps<T>,
) {
  const attrs = useCtrlAttrs(props);
  return <TextareaInput {...attrs} />;
}

function SelectInputField<T extends FieldValues>(
  props: ControledFieldProps<T>,
) {
  const attrs = useCtrlAttrs(props);
  return <SelectInput {...attrs} />;
}

function BtnGroupInputField<T extends FieldValues>(
  props: ControledFieldProps<T>,
) {
  const attrs = useCtrlAttrs(props);
  return <BtnGroupInput {...attrs} />;
}

function RadioInputField<T extends FieldValues>({
  options,
  ...props
}: ControledFieldProps<T>) {
  const attrs = useCtrlAttrs(props);
  const optionsPairs = useMemo(() => Object.entries(options ?? {}), [options]);
  return (
    <div className="flex flex-col gap-1">
      {optionsPairs.map(([value, label]) => (
        <RadioInput key={value} {...attrs} value={value} label={label} />
      ))}
    </div>
  );
}

function DatetimeInputField<T extends FieldValues>(
  props: ControledFieldProps<T>,
) {
  const attrs = useCtrlAttrs(props, { setValueAs: (v: any) => v?.toDate() });
  const { setValue } = useFormContext<T>();
  const handleChange = useCallback(
    (dates: DateObject) => {
      setValue(attrs.name, (dates.isValid ? dates : "") as any);
    },
    [setValue],
  );
  const value = useMemo(() => {
    const d = new DateObject(attrs.value);
    return d.isValid ? d : undefined;
  }, [attrs.value]);
  return (
    <DatepickerInput
      {...attrs}
      onChange={handleChange}
      value={value}
      ref={attrs.ref as any}
    />
  );
}

export function GenericInputRouter<T extends FieldValues>({
  type,
  ...props
}: GenericFieldProps<T> & { id: string }) {
  const { control } = useFormContext<T>();

  if (type === "switch")
    return <SwitchInputField {...props} control={control} />;

  if (type === "checkbox")
    return <CheckboxInputField {...props} control={control} />;

  if (type === "date")
    return <DatetimeInputField {...props} control={control} />;

  if (type === "select")
    return <SelectInputField {...props} control={control} />;

  if (type === "textarea")
    return <TextareaInputField {...props} control={control} />;

  if (type === "btngroup")
    return <BtnGroupInputField {...props} control={control} />;

  if (type === "radio") return <RadioInputField {...props} control={control} />;

  return <TextInputField type={type} {...props} control={control} />;
}

export default function GenericField<T extends FieldValues>({
  label,
  className,
  inline,
  about,
  ...props
}: GenericFieldProps<T> & { label: ReactNode }) {
  const id2 = useId();
  const id = props.id ?? id2;
  const isCheckbox = ["checkbox", "switch"].includes(props.type);
  const layout = isCheckbox ? "checkbox" : inline ? "inline" : "default";
  const cls = fieldsetTV({ layout });

  return (
    <div className={"relative " + className}>
      <div className={cls}>
        <FieldLabel
          htmlFor={id}
          required={!!props.rules?.required}
          checkbox={isCheckbox}
          inline={inline}
        >
          {label}
        </FieldLabel>
        <GenericInputRouter {...props} inline={inline} id={id} />
      </div>
      <FieldErrorMessage name={props.name} about={about} />
    </div>
  );
}
