import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex items-center justify-center rounded-xl px-4 py-2 text-base font-medium transition duration-200",
  variants: {
    variant: {
      primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
    },
    size: {
    },
    icon: {
      true: ""
    },
    disabled: {
      true: ""
    }
  },
  compoundVariants: [
  ],
  defaultVariants: {
    variant: "primary"
  }
});

type ButtonVariantProps = VariantProps<typeof button>
type ExternalButtonVariantProps = Omit<ButtonVariantProps, ''>

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function Button(props: PropsWithChildren<ButtonProps & ButtonVariantProps>) {
  const { variant, size, icon, className, ...restProps } = props
  const { disabled } = restProps
  const cls =button({ variant, size, icon, disabled, className })
  return (
    <button className={cls} {...restProps}>
      {props.children}
    </button>
  )
}