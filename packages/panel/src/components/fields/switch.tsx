import { forwardRef } from "react";
import { inputTV, InputVariantProps } from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import {
  ToggleSwitch as FlowToggleSwitch,
  ToggleSwitchProps,
} from "flowbite-react";

export const SwitchInput = forwardRef(
  (props: ToggleSwitchProps & InputVariantProps, ref) => {
    const { className, ...field } = props;
    const cls = inputTV({ className });
    return <FlowToggleSwitch className={cls} {...field} ref={ref as any} />;
  },
);
