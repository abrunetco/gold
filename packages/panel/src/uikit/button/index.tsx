import * as HL from "@headlessui/react";
import { tv, type VariantProps } from "tailwind-variants";

const variant = tv({
  base: "rounded-md bg-blue-500 font-medium text-white active:opacity-80",
  variants: {
    color: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-purple-500 text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-3 py-1",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

type TVariant = VariantProps<typeof variant>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonProps {}

export default function Button({
  className,
  ...props
}: HL.ButtonProps & ButtonProps & TVariant) {
  return (
    <HL.Button
      {...props}
      className={variant({ ...props, class: className } as TVariant)}
    />
  );
}
