import { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

const variant = tv(
  {
    base: "main-layout",
    variants: {
      size: {
        xs: "size-xs",
        sm: "size-sm",
        md: "size-md",
        lg: "size-lg",
        xl: "size-xl",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
  { responsiveVariants: ["sm", "md", "lg", "xl"] },
);

export default function MainLayout({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const cls = variant({
    class: className,
    size: {
      initial: "xs",
      sm: "sm",
      md: "md",
      lg: "lg",
      xl: "xl",
    },
  });
  return <section className={cls}>{children}</section>;
}
