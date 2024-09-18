import { tv, VariantProps } from "tailwind-variants";

export const inputTV = tv({
  base: `flex flex-row-reverse`,
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

export type InputVariantProps = VariantProps<typeof inputTV>;

export const labelTV = tv({
  base: `text-sm font-medium text-gray-900 dark:text-white`,
  variants: {
    required: { true: `after:px-1 after:text-red-500 after:content-['*']` },
    checkbox: { true: `pt-1` },
    inline: { true: `pt-2` },
  },
  compoundVariants: [],
  defaultVariants: {
    required: false,
    checkbox: false,
  },
});

export type LabelVariantProps = VariantProps<typeof labelTV>;

export const fieldsetTV = tv({
  base: `relative`,
  variants: {
    layout: {
      default: `flex flex-col gap-1`,
      inline: `grid grid-cols-[25%_1fr] gap-2`,
      checkbox: `flex flex-row-reverse items-center justify-end gap-2`,
    },
  },
  compoundVariants: [],
  defaultVariants: {
    layout: "default",
  },
});

export type FieldsetVariantProps = VariantProps<typeof fieldsetTV>;

export const selectTV = tv({
  base: ``,
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

export type SelectVariantProps = VariantProps<typeof selectTV>;

export const btnGroupTV = tv({
  base: `flex flex-row-reverse justify-end`,
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

export type BtnGroupVariantProps = VariantProps<typeof btnGroupTV>;

export const checkboxTV = tv({
  base: ``,
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

export type CheckboxVariantProps = VariantProps<typeof checkboxTV>;

export const radioTV = tv({
  base: `flex items-center gap-2`,
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

export type RadioVariantProps = VariantProps<typeof radioTV>;
