import { tv, VariantProps } from 'tailwind-variants';
import { inputTV } from '../text/variant';

export const labelTV = tv({
  base: 'text-sm text-gray-700 dark:text-white',
  variants: {
    variant: {
      th: "text-black",
      td: "",
      auth: "ms-1.5 font-medium",
      form: "ms-3 font-bold"
    },
    disabled: {
      true: ""
    },
    required: {
      true: ""
    },
    severity: {
      default: '',
      success: '',
      error: ''
    }
  },
  compoundVariants: [
  ],
  defaultVariants: {
    theme: "form",
    severity: "default",
    disabled: false,
    required: false,
  }
});

export type LabelVariantProps = VariantProps<typeof labelTV>

export const fieldsetTV = tv({
  base: 'flex flex-col select-none',
  variants: {
    variant: {
      th: "",
      td: "",
      auth: "",
      form: ""
    },
    disabled: {
      true: ""
    },
    required: {
      true: ""
    },
    severity: {
      default: '',
      success: '',
      error: ''
    }
  },
  compoundVariants: [
  ],
  defaultVariants: {
    theme: "form",
    severity: "default",
    disabled: false,
    required: false,
  }
});

export type FieldsetVariantProps = VariantProps<typeof fieldsetTV>