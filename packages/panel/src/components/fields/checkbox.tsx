import { forwardRef } from "react";
import { inputTV, InputVariantProps } from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Checkbox as FlowCheckbox, CheckboxProps } from "flowbite-react";

export const CheckboxInput = forwardRef(
  (props: CheckboxProps & InputVariantProps, ref) => {
    const { className, ...field } = props;
    const cls = inputTV({ className });
    return <FlowCheckbox className={cls} {...field} ref={ref as any} />;
  },
);
