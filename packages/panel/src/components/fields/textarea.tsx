import { ForwardedRef, forwardRef } from "react";
import { inputTV, InputVariantProps } from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Textarea as FlowTextarea, TextareaProps } from "flowbite-react";

export const TextareaInput = forwardRef(
  (props: TextareaProps & InputVariantProps, ref: ForwardedRef<any>) => {
    const { className, ...field } = props;
    const cls = inputTV({ className });
    return <FlowTextarea {...field} className={cls} ref={ref} />;
  },
);
