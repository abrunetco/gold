import { PropsWithChildren } from "react";
import { tv, VariantProps } from "tailwind-variants";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { ButtonProps, Button as FlowButton } from "flowbite-react";

const button = tv({
  base: ``,
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

type ButtonVariantProps = VariantProps<typeof button>;

export function Button(
  props: PropsWithChildren<ButtonProps & ButtonVariantProps>,
) {
  const { className, ...restProps } = props;
  const cls = button({ className });
  return (
    <FlowButton className={cls} {...restProps}>
      {props.children}
    </FlowButton>
  );
}
