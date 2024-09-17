import { PropsWithChildren } from "react";
import { labelTV, type LabelVariantProps } from "./variant";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Label, LabelProps } from "flowbite-react";

export function FieldLabel(
  props: PropsWithChildren<LabelProps & LabelVariantProps>,
) {
  const { children, className, required, checkbox, inline, ...rest } = props;
  const cls = labelTV({ required, checkbox, inline, className });

  return (
    <Label {...rest} className={cls}>
      {children}
    </Label>
  );
}
