import { ForwardedRef, forwardRef, ReactNode, useId } from "react";
import { radioTV, RadioVariantProps } from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Label, Radio, RadioProps } from "flowbite-react";

interface RadioInputProps extends RadioProps {
  name: string;
  value: string;
  label: ReactNode;
}

export const RadioInput = forwardRef(
  (
    props: RadioInputProps & RadioVariantProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const { className, label, ...field } = props;
    const id = useId();
    const cls = radioTV({ className });
    return (
      <div className={cls}>
        <Radio {...field} id={id} ref={ref} />
        <Label htmlFor={id}>{label}</Label>
      </div>
    );
  },
);
