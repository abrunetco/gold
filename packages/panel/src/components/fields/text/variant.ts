import { tv, VariantProps } from "tailwind-variants";

export const inputTV = tv({
  base: "mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 outline-none",
  variants: {
    variant: {
      th: "",
      td: "",
      auth: "",
      form: "",
    },
    disabled: {
      true: "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]",
    },
    severity: {
      default: "",
      success: "",
      error: "",
    },
    size: {
      sm: "h-6 p-1 text-xs",
      md: "h-12 p-3 text-sm",
      lg: "",
    },
  },
  compoundVariants: [
    {
      disabled: false,
      severity: "default",
      class: "border-gray-200 dark:!border-white/10 dark:text-white",
    },
    {
      disabled: false,
      severity: "error",
      class:
        "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400",
    },
    {
      disabled: false,
      severity: "success",
      class:
        "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400",
    },
  ],
  defaultVariants: {
    variant: "form",
    size: "md",
    severity: "default",
    disabled: false,
  },
});

export type InputVariantProps = VariantProps<typeof inputTV>;
