import { tv, VariantProps } from 'tailwind-variants';

export const checkboxTV = tv({
  base: '',
  variants: {
    variant: {
      th: "",
      td: "",
      auth: "",
      form: ""
    },
    disabled: {
      true: ''
    },
    severity: {
      default: '',
      success: '',
      error: ''
    }
  },
  compoundVariants: [
    {
      disabled: false,
      severity: 'default',
      class: ""
    },
    {
      disabled: false,
      severity: 'error',
      class: ""
    },
    {
      disabled: false,
      severity: 'success',
      class: ""
    },
  ],
  defaultVariants: {
    severity: "default",
    disabled: false
  }
});

export type CheckboxVariantProps = VariantProps<typeof checkboxTV>