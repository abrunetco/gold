import { forwardRef } from "react";
import { inputTV, InputVariantProps } from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TextInput as FlowTextInput, TextInputProps } from "flowbite-react";

export const TextInput = forwardRef(
  (props: TextInputProps & InputVariantProps, ref) => {
    const { type = "text", className, ...field } = props;
    const cls = inputTV({ className });

    return (
      <FlowTextInput type={type} className={cls} {...field} ref={ref as any} />
    );
  },
);
