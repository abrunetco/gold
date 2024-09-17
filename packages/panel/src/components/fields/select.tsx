import { forwardRef, ReactNode, useMemo } from "react";
import { selectTV, SelectVariantProps } from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Select as FlowSelect, SelectProps } from "flowbite-react";

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
