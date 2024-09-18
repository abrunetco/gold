import { forwardRef, ReactNode, useMemo } from "react";
import {
  btnGroupTV,
  BtnGroupVariantProps,
  selectTV,
  SelectVariantProps,
} from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Button, Select as FlowSelect, SelectProps } from "flowbite-react";

interface SelectInputProps extends SelectProps {
  options?: Record<string, ReactNode>;
}

export const SelectInput = forwardRef(
  (props: SelectInputProps & SelectVariantProps, ref) => {
    const { className, children, options, ...field } = props;
    const cls = selectTV({ className });
    const optionsPairs = useMemo(
      () => Object.entries(options ?? {}),
      [options],
    );

    return (
      <FlowSelect className={cls} {...field} ref={ref as any}>
        {options
          ? optionsPairs.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))
          : children}
      </FlowSelect>
    );
  },
);

interface BtnGroupInputProps extends SelectProps {
  options?: Record<string, ReactNode>;
  className?: string;
}

export const BtnGroupInput = forwardRef(
  (props: BtnGroupInputProps & BtnGroupVariantProps, ref) => {
    const { className, options, size = "sm" } = props;
    const optionsPairs = useMemo(
      () => Object.entries(options ?? {}),
      [options],
    );
    const cls = btnGroupTV({ className });

    return (
      <Button.Group outline className={cls} ref={ref as any}>
        {optionsPairs.map(([value, label]) => (
          <Button
            value={value}
            key={value}
            size={size}
            className="flex-1"
            color={props.value === value ? "blue" : "light"}
            onClick={(e: any) => {
              props.onChange({ ...e, target: { value } });
            }}
          >
            {label}
          </Button>
        ))}
      </Button.Group>
    );
  },
);
