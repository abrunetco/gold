import { tv, VariantProps } from "tailwind-variants";

export const formTV = tv({
  base: `flex flex-col gap-3`,
  variants: {},
  compoundVariants: [],
  defaultVariants: {},
});

export type FormVariantProps = VariantProps<typeof formTV>;

export const submitBtnTV = tv({
  base: ``,
  variants: {
    type: {
      send: ``,
      save: ``,
      login: ``,
    },
  },
  compoundVariants: [],
  defaultVariants: {
    type: "send",
  },
});

export type SubmitBtnVariantProps = VariantProps<typeof submitBtnTV>;
