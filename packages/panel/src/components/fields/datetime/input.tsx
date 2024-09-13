// import { ReactNode, SelectHTMLAttributes } from "react";
import DatePicker, {
  CalendarProps,
  DatePickerProps,
} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { InputProps, TextInput } from "../text";
import { InputVariantProps } from "../text/variant";

// import { SelectVariantProps } from "./variant";
// import { selectTV, SelectVariantProps } from "./variant";

// type ExternalInputVariantProps = Omit<SelectVariantProps, "">;

// export interface SelectInputProps
//   extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
//   options: [string, ReactNode][];
// }

export function DatepickerInput<
  Multiple extends boolean = false,
  Range extends boolean = false,
>(
  props: Omit<CalendarProps<Multiple, Range>, "onChange"> &
    DatePickerProps<Multiple, Range> &
    Omit<InputProps, "value" | "onChange"> &
    InputVariantProps,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, onChange, ...field } = props;
  const { disabled } = field;
  return (
    <DatePicker
      {...props}
      disabled={disabled}
      calendar={persian}
      locale={persian_fa}
      render={<TextInput {...field} />}
    />
  );
}
