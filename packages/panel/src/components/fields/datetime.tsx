// import { ReactNode, SelectHTMLAttributes } from "react";
import DatePicker, {
  CalendarProps,
  DatePickerProps,
} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TextInput } from "./input";
import { InputVariantProps } from "./variant";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

function DatepickerInputWithRef<
  Multiple extends boolean = false,
  Range extends boolean = false,
>(
  props: CalendarProps<Multiple, Range> &
    DatePickerProps<Multiple, Range> &
    Omit<ComponentProps<typeof TextInput>, "value" | "onChange"> &
    InputVariantProps,
  ref: ForwardedRef<any>,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, onChange, ...field } = props;
  const { disabled } = field;
  return (
    <DatePicker
      {...props}
      ref={ref as any}
      disabled={disabled}
      calendar={persian}
      locale={persian_fa}
      render={<TextInput {...field} />}
    />
  );
}

export const DatepickerInput = forwardRef(DatepickerInputWithRef);
